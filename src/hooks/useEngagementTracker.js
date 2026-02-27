"use client";

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const HEARTBEAT_INTERVAL = 30000; // 30 seconds
const INACTIVITY_THRESHOLD = 20000; // 20 seconds

export function useEngagementTracker(apiUrl) {
    const pathname = usePathname();
    const [sessionId, setSessionId] = useState(null);
    const [timeOnPage, setTimeOnPage] = useState(0);
    const lastActivityRef = useRef(Date.now());
    const heartbeatTimerRef = useRef(null);
    const startTimeRef = useRef(Date.now());
    const [isActiveTab, setIsActiveTab] = useState(true);

    // Initialize Session & User Identity
    useEffect(() => {
        // Handle Session ID
        let sid = localStorage.getItem('ms_sid_react');
        if (!sid) {
            sid = 'sr_' + Math.random().toString(36).substring(2, 11);
            localStorage.setItem('ms_sid_react', sid);
        }
        setSessionId(sid);

        // Handle User Identity from URL (?msuid=...)
        const urlParams = new URLSearchParams(window.location.search);
        let msuid = urlParams.get('msuid');

        if (msuid) {
            console.log(`[Engagement] Identity captured from URL: ${msuid}`);
            localStorage.setItem('ms_uid_react', msuid);
        } else {
            const storedUid = localStorage.getItem('ms_uid_react');
            if (storedUid && typeof window !== 'undefined') {
                const currentUrl = new URL(window.location.href);
                if (currentUrl.searchParams.get('msuid') !== storedUid) {
                    console.log(`[Engagement] Re-applying identity to URL: ${storedUid}`);
                    currentUrl.searchParams.set('msuid', storedUid);
                    window.history.replaceState(null, '', currentUrl.toString());
                }
            }
        }
    }, [pathname]); // Re-run on navigation to ensure URL consistency

    // Track Activity
    useEffect(() => {
        const handleActivity = () => {
            lastActivityRef.current = Date.now();
        };

        const handleVisibilityChange = () => {
            setIsActiveTab(!document.hidden);
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

    // Send Events helper
    const sendEvent = async (eventType, extra = {}) => {
        if (!sessionId) return;

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
            is_active_tab: isActiveTab,
            inactivity_seconds: inactivitySeconds,
            consent: true, // Assuming consent for now as per rules
            ...extra
        };

        try {
            console.log(`[Engagement] Sending ${eventType} for session ${sessionId}...`);
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.warn(`[Engagement] Server 500 Error: ${errorBody}`);
                return;
            }

            const result = JSON.parse(await response.text());
            if (result.action === 'SEND_POPUP' && result.message) {
                console.log('[Engagement] Triggering popup message!');
                window.dispatchEvent(new CustomEvent('ms-engagement-popup', {
                    detail: { message: result.message }
                }));
            } else {
                console.log(`[Engagement] Silent response from server: ${result.reason || 'No action needed'}`);
            }
        } catch (err) {
            console.warn('[Engagement] tracker failed to send event:', err);
        }
    };

    // Lifecycle Events
    useEffect(() => {
        if (!sessionId) return;

        startTimeRef.current = Date.now();
        sendEvent('page_view_start');

        heartbeatTimerRef.current = setInterval(() => {
            sendEvent('page_heartbeat');
        }, HEARTBEAT_INTERVAL);

        return () => {
            if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
            sendEvent('page_view_end');
        };
    }, [sessionId, pathname]);

    return { sessionId, timeOnPage: Math.floor((Date.now() - startTimeRef.current) / 1000) };
}
