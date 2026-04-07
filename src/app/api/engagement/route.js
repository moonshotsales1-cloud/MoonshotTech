import { NextResponse } from 'next/server';

// Only these event types should actually call n8n.
// Heartbeats and page_view events are silenced to prevent n8n from
// generating duplicate AI greetings in the chatbox on every heartbeat.
// FIX: expanded to include page_heartbeat and page_view_start so n8n
// receives the events it needs to evaluate time_on_page_seconds eligibility
const EVENTS_THAT_CALL_N8N = ['engagement_trigger', 'page_heartbeat', 'page_view_start'];

export async function POST(req) {
    try {
        const body = await req.json();
        const { event_type } = body;

        // FIX: restored filter but with the correct event list above
        if (!EVENTS_THAT_CALL_N8N.includes(event_type)) {
            console.log(`[Engagement API] Silencing non-trigger event: ${event_type}`);
            return NextResponse.json({ action: 'SILENT', reason: `event_type '${event_type}' is not forwarded to n8n` });
        }

        const n8nBaseUrl = process.env.N8N_BASE_URL?.replace(/\/$/, '');
        if (!n8nBaseUrl) {
            console.error('[Engagement API] N8N_BASE_URL is not set');
            return NextResponse.json({ error: 'N8N_BASE_URL not configured' }, { status: 500 });
        }

        const {
            session_id: sessionId,
            client_id,
            page_url,
            time_on_page_seconds: time_on_page
        } = body;

        const n8nPayload = {
            event_type,
            session_id: sessionId,
            client_id,
            user_id: body.user_id || sessionId,
            page_url,
            time_on_page_seconds: time_on_page,
            consent: true
        };

        const targetUrl = `${n8nBaseUrl}/webhook/antigravity-engagement`;
        console.log(`[Engagement API] Forwarding ${event_type} to: ${targetUrl}`);

        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(n8nPayload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[Engagement API] n8n error (${response.status}):`, errorText);
            return NextResponse.json({ action: 'SILENT', reason: `n8n returned ${response.status}` });
        }

        const rawText = await response.text();
        console.log('[Engagement API] Raw n8n response:', JSON.stringify(rawText));

        try {
            let parsed = JSON.parse(rawText);

            // Case 1: Array wrapping [{...}]
            if (Array.isArray(parsed)) parsed = parsed[0];

            // Case 2: Double-encoded string
            if (typeof parsed === 'string') parsed = JSON.parse(parsed);

            // Case 3: Nested output/body (string or object)
            const nestedField = parsed?.output || parsed?.body || parsed?.data;
            if (nestedField) {
                if (typeof nestedField === 'string') {
                    try { parsed = JSON.parse(nestedField); } catch (_) { }
                } else {
                    parsed = nestedField;
                }
            }

            console.log('[Engagement API] Final normalized object:', JSON.stringify(parsed));

            // Case-insensitive lookup for action and message
            const getField = (obj, key) => {
                if (!obj || typeof obj !== 'object') return null;
                const foundKey = Object.keys(obj).find(k => k.toLowerCase() === key.toLowerCase());
                return foundKey ? obj[foundKey] : null;
            };

            const action = (getField(parsed, 'action') || '').toString().toUpperCase();
            const message = getField(parsed, 'message');

            const IS_POPUP_ACTION = action === 'SEND_POPUP' || action === 'SHOW_POPUP' || action === 'TRIGGER_POPUP';

            if (IS_POPUP_ACTION && message) {
                console.log('[Engagement API] SUCCESS: Sending popup to client');
                return NextResponse.json({ action: 'SEND_POPUP', message });
            }

            console.log(`[Engagement API] SILENT: Action was '${action}' or message empty`);
            return NextResponse.json({
                action: 'SILENT',
                reason: `n8n did not return a popup action (Action: ${action})`,
                debug_raw: rawText.substring(0, 500) // Expose raw for debugging
            });

        } catch (e) {
            console.error('[Engagement API] Resilient parse failed:', e.message);
            return NextResponse.json({
                action: 'SILENT',
                reason: 'JSON parse error',
                debug_raw: rawText.substring(0, 500)
            });
        }
    } catch (error) {
        console.error('[Engagement API] Unhandled error:', error);
        return NextResponse.json({ action: 'SILENT', reason: 'Internal error' }, { status: 500 });
    }
}