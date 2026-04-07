import { NextResponse } from 'next/server';

export const maxDuration = 60;

// ─── Helper: fetch with a manual timeout ──────────────────────────────────────
async function fetchWithTimeout(url, options, timeoutMs = 55000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        return response;
    } finally {
        clearTimeout(timer);
    }
}

// ─── Helper: fetch with retry on transient errors ─────────────────────────────
async function fetchWithRetry(url, options, { retries = 2, delayMs = 2000, timeoutMs = 55000 } = {}) {
    let lastError;
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetchWithTimeout(url, options, timeoutMs);
            if (response.status >= 500 && attempt < retries) {
                const text = await response.text();
                console.warn(`Attempt ${attempt} got ${response.status}, retrying in ${delayMs}ms. Body: ${text.substring(0, 200)}`);
                await new Promise(r => setTimeout(r, delayMs));
                continue;
            }
            return response;
        } catch (err) {
            lastError = err;
            const isTimeout = err.name === 'AbortError';
            console.warn(`Attempt ${attempt} failed (${isTimeout ? 'TIMEOUT' : err.message})`);
            if (attempt < retries) {
                await new Promise(r => setTimeout(r, delayMs));
            }
        }
    }
    throw lastError || new Error('All retry attempts failed');
}

// ─── Helper: robustly extract response text from any n8n payload shape ────────
function extractResponseText(data) {
    const candidates = Array.isArray(data) ? data : [data];
    for (const item of candidates) {
        if (!item || typeof item !== 'object') continue;
        const direct = item.response || item.output || item.text || item.message || item.answer;
        if (direct && typeof direct === 'string' && direct.trim()) return direct.trim();
        const nested =
            item?.json?.response ||
            item?.json?.output ||
            item?.json?.text ||
            item?.data?.response ||
            item?.data?.output ||
            item?.body?.response;
        if (nested && typeof nested === 'string' && nested.trim()) return nested.trim();
    }
    return null;
}

// ─── Helper: extract suggestions array from n8n payload ───────────────────────
function extractSuggestions(data) {
    const candidates = Array.isArray(data) ? data : [data];
    for (const item of candidates) {
        if (!item || typeof item !== 'object') continue;
        const s = item.suggestions || item?.json?.suggestions || item?.data?.suggestions;
        if (Array.isArray(s) && s.length > 0) {
            return s.map(String).filter(Boolean).slice(0, 4);
        }
    }
    return [];
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { message, timestamp, sessionId } = body || {};
        if (!message) return NextResponse.json({ error: 'Message is required' }, { status: 400 });

        const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
        if (!n8nWebhookUrl) {
            console.error('N8N_WEBHOOK_URL not configured');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const n8nResponse = await fetchWithRetry(
            n8nWebhookUrl,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message,
                    timestamp: timestamp || new Date().toISOString(),
                    sessionId: sessionId || 'unknown'
                })
            },
            {
                retries: 2,
                delayMs: 2000,
                timeoutMs: 55000
            }
        );

        const rawText = await n8nResponse.text();

        if (!n8nResponse.ok) {
            console.error(`n8n returned HTTP ${n8nResponse.status}:`, rawText.substring(0, 500));
            return NextResponse.json({ error: `n8n webhook error: ${n8nResponse.status}` }, { status: n8nResponse.status });
        }

        let data;
        try {
            data = JSON.parse(rawText);
        } catch {
            console.error('n8n returned non-JSON. Raw:', rawText.substring(0, 500));
            return NextResponse.json({ error: 'Invalid JSON from n8n' }, { status: 500 });
        }

        const responseText = extractResponseText(data);
        if (!responseText) {
            console.error('Could not find response text in n8n payload:', JSON.stringify(data).substring(0, 500));
            return NextResponse.json({ error: 'No response text found in n8n payload' }, { status: 500 });
        }

        const suggestions = extractSuggestions(data);
        const payload = Array.isArray(data) ? data[0] : data;
        const returnedSessionId = payload?.sessionId || payload?.json?.sessionId || sessionId;

        return NextResponse.json({
            response: responseText,
            output: responseText,
            text: responseText,
            suggestions,
            sessionId: returnedSessionId,
            timestamp: payload?.timestamp || new Date().toISOString()
        });

    } catch (error) {
        const isTimeout = error.name === 'AbortError' || error.message?.includes('abort');
        console.error('Chat API error:', error.message);
        const userMessage = isTimeout
            ? "I'm taking a bit longer than usual — please send your message again."
            : "I ran into a hiccup, please try again in a moment.";

        return NextResponse.json({
            error: 'Failed to process message',
            message: error.message,
            response: userMessage
        }, { status: 500 });
    }
}
