"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const HEARTBEAT_INTERVAL = 30000; // 30 seconds
const INACTIVITY_THRESHOLD = 20000; // 20 seconds

// onPopupRef: a React ref holding a (message: string) => void callback.
// Using a ref lets MoonshotChat always provide a fresh closure without
// the tracker hook needing to re-run its effects.
export function useEngagementTracker(apiUrl, onPopupRef) {
    const pathname = usePathname();
    const [sessionId, setSessionId] = useState(null);
    const [timeOnPage, setTimeOnPage] = useState(0);
    const lastActivityRef = useRef(Date.now());
    const heartbeatTimerRef = useRef(null);
    const startTimeRef = useRef(Date.now());
    // FIX: was useState(true) — state causes stale closures in setTimeout/setInterval
    const isActiveTabRef = useRef(true);

    // Initialize Session & User Identity
    useEffect(() => {
        // Handle Session ID
        let sid = localStorage.getItem('ms_sid_react');
        if (!sid) {
            sid = 'sr_' + Math.random().toString(36).substring(2, 11);
            localStorage.setItem('ms_sid_react', sid);
        }
        setSessionId(sid);

        // Handle User Identity from URL (?client_id=... or ?msuid=...)
        const urlParams = new URLSearchParams(window.location.search);

        // --- NEW: Reset Helper for Testing ---
        if (urlParams.get('reset') === 'true') {
            console.log('[Engagement] Reset parameter detected. Clearing all session data...');
            Object.keys(localStorage).forEach(k => k.startsWith('ms_') && localStorage.removeItem(k));
            Object.keys(sessionStorage).forEach(k => k.startsWith('ms_') && sessionStorage.removeItem(k));

            // Clean URL to prevent infinite reset loop
            const cleanUrl = new URL(window.location.href);
            cleanUrl.searchParams.delete('reset');
            window.history.replaceState(null, '', cleanUrl.toString());
            window.location.reload();
            return;
        }

        let foundId = urlParams.get('client_id') || urlParams.get('msuid');

        if (foundId && foundId !== 'null') {
            console.log(`[Engagement] Identity captured from URL: ${foundId}`);
            localStorage.setItem('ms_uid_react', foundId);

            // Also store as user name for frontend fallback
            const userName = urlParams.get('msuid') || foundId;
            localStorage.setItem('ms_user_name', userName);

            // Clean up URL: Settle on client_id and remove msuid to avoid confusion/cache
            if (urlParams.has('msuid')) {
                const currentUrl = new URL(window.location.href);
                currentUrl.searchParams.delete('msuid');
                currentUrl.searchParams.set('client_id', foundId);
                window.history.replaceState(null, '', currentUrl.toString());
            }
        } else {
            const storedUid = localStorage.getItem('ms_uid_react');
            if (storedUid && storedUid !== 'null' && typeof window !== 'undefined') {
                const currentUrl = new URL(window.location.href);
                // Only re-apply if NO identity parameter is currently present
                if (!currentUrl.searchParams.has('client_id') && !currentUrl.searchParams.has('msuid')) {
                    console.log(`[Engagement] Re-applying identity to URL: ${storedUid}`);
                    currentUrl.searchParams.set('client_id', storedUid);
                    window.history.replaceState(null, '', currentUrl.toString());
                }
            }
        }
    }, [pathname]);

    // Track Activity
    useEffect(() => {
        const handleActivity = () => {
            lastActivityRef.current = Date.now();
        };

        const handleVisibilityChange = () => {
            // FIX: update ref instead of calling setIsActiveTab
            isActiveTabRef.current = !document.hidden;
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('scroll', handleActivity);
        window.addEventListener('keydown', handleActivity);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('scroll', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    // Proactive Engagement Logic
    const engagementDoneRef = useRef(false);

    useEffect(() => {
        // Use sessionStorage so the flag resets each browser session.
        // If we used localStorage it would block the popup permanently after one view.
        if (typeof window !== 'undefined') {
            engagementDoneRef.current = sessionStorage.getItem('ms_engagement_displayed') === 'true';
        }
    }, []);

    // Send Events helper
    const sendEvent = async (eventType, extra = {}, retryCount = 0) => {
        if (!sessionId || engagementDoneRef.current) return;

        // Skip non-essential events if already engaged or in middle of one
        if (engagementDoneRef.current && (eventType === 'engagement_trigger' || eventType === 'page_heartbeat')) {
            return;
        }

        const inactivitySeconds = Math.floor((Date.now() - lastActivityRef.current) / 1000);
        const currentPageTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const uid = localStorage.getItem('ms_uid_react');

        const payload = {
            event_type: eventType,
            session_id: sessionId,
            user_id: uid,
            page_url: window.location.href,
            page_name: document.title || pathname,
            time_on_page_seconds: currentPageTime,
            // FIX: read from ref instead of stale isActiveTab state
            is_active_tab: isActiveTabRef.current,
            inactivity_seconds: inactivitySeconds,
            consent: true,
            ...extra
        };

        const pollForPopup = async (pollUrl, attempts = 5) => {
            if (attempts <= 0 || engagementDoneRef.current) return;
            console.log(`[Engagement] Polling for popup (${attempts} attempts left)...`);
            await new Promise(r => setTimeout(r, 3000));
            try {
                const res = await fetch(pollUrl);
                const data = await res.json();
                if (data.action === 'SEND_POPUP' && data.message) {
                    triggerPopup(data.message);
                } else if (data.action === 'PENDING') {
                    await pollForPopup(pollUrl, attempts - 1);
                }
            } catch (e) {
                console.warn('[Engagement] Polling failed:', e);
            }
        };

        const triggerPopup = (message) => {
            if (engagementDoneRef.current) return;

            console.log('[Engagement] Triggering popup message!');
            engagementDoneRef.current = true;
            // sessionStorage: resets on new browser session, not persisted forever
            sessionStorage.setItem('ms_engagement_displayed', 'true');

            // 1. Direct callback into MoonshotChat (most reliable — no stale closure)
            if (onPopupRef && onPopupRef.current) {
                onPopupRef.current(message);
            }

            // 2. Custom event as fallback
            window.dispatchEvent(new CustomEvent('ms-engagement-popup', {
                detail: { message }
            }));

            // Stop heartbeat immediately
            if (heartbeatTimerRef.current) {
                clearInterval(heartbeatTimerRef.current);
                heartbeatTimerRef.current = null;
            }
        };

        try {
            console.log(`[Engagement] Sending ${eventType} (Attempt ${retryCount + 1})...`);
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                if (retryCount < 1) {
                    console.warn(`[Engagement] Server Error ${response.status}. Retrying in 2s...`);
                    await new Promise(r => setTimeout(r, 2000));
                    return sendEvent(eventType, extra, retryCount + 1);
                }
                return;
            }

            const result = await response.json();

            if (result.action === 'SEND_POPUP' && result.message) {
                triggerPopup(result.message);
            } else if (result.action === 'PENDING' && result.poll_url) {
                pollForPopup(result.poll_url);
            } else {
                console.log(`[Engagement] Silent response: ${result.reason || 'OK'}`);
            }
        } catch (err) {
            console.warn('[Engagement] tracker failed to send event:', err);
            if (retryCount < 1) {
                await new Promise(r => setTimeout(r, 2000));
                return sendEvent(eventType, extra, retryCount + 1);
            }
        }
    };

    // 20s Natural Trigger (Once per user)
    useEffect(() => {
        if (!sessionId || engagementDoneRef.current) return;

        const timer = setTimeout(() => {
            // FIX: read from ref instead of stale isActiveTab state
            if (!engagementDoneRef.current && isActiveTabRef.current) {
                console.log('[Engagement] 20s threshold reached. Triggering heartbeat for eligibility...');
                sendEvent('page_heartbeat');
            }
        }, 20000);

        return () => clearTimeout(timer);
    }, [sessionId]); // Only on session init, survives tab focus changes

    // Lifecycle: View Start, End and Heartbeats
    useEffect(() => {
        if (!sessionId || engagementDoneRef.current) return;

        startTimeRef.current = Date.now();
        sendEvent('page_view_start');

        // Heartbeat (Only if tab is active and not engaged)
        heartbeatTimerRef.current = setInterval(() => {
            // FIX: read from ref instead of stale isActiveTab state
            if (isActiveTabRef.current && !engagementDoneRef.current) {
                sendEvent('page_heartbeat');
            }
        }, HEARTBEAT_INTERVAL);

        return () => {
            if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
            sendEvent('page_view_end');
        };
    }, [sessionId, pathname]); // Re-runs on page change to track different pages

    return { sessionId, timeOnPage: Math.floor((Date.now() - startTimeRef.current) / 1000) };
}
