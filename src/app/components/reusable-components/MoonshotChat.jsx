"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useEngagementTracker } from '@/hooks/useEngagementTracker';

/**
 * MoonshotChat Component
 * @param {string} apiUrl - The URL to your chat API (defaults to /api/chat)
 */
const MoonshotChat = ({ apiUrl = '/api/chat', engagementApiUrl = '/api/engagement' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "👋 Hi! How can I help you today?", isUser: false }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState(['Our services', 'Get a quote']);
    const [messageCount, setMessageCount] = useState(0);
    const [shownChips, setShownChips] = useState({});
    const [notification, setNotification] = useState(null);

    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const messagesEndRef = useRef(null);

    // Stable callback ref — .current is updated every render so the tracker
    // always calls into the component with fresh isOpen / state values.
    const onPopupRef = useRef(null);
    onPopupRef.current = (message) => {
        if (!message) return;
        console.log(`[MoonshotChat] onPopupRef called: "${message}"`);
        const sid = localStorage.getItem('ms_sid_react');
        if (!isOpen) {
            setNotification(message);
            if (sid) localStorage.setItem(`ms_notif_pending_${sid}`, message);
        } else {
            setMessages(prev => [...prev, { text: message, isUser: false }]);
        }
    };

    // Initialize engagement tracker, passing the popup callback ref
    useEngagementTracker(engagementApiUrl, onPopupRef);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, suggestions]);

    // Load persisted state (messages and pending notifications)
    useEffect(() => {
        const sid = localStorage.getItem('ms_sid_react');
        if (sid) {
            const savedMessages = localStorage.getItem(`ms_msgs_${sid}`);
            if (savedMessages) {
                setMessages(JSON.parse(savedMessages));
            }

            const pendingNotif = localStorage.getItem(`ms_notif_pending_${sid}`);
            if (pendingNotif && !isOpen) {
                setNotification(pendingNotif);
            }
        }
    }, []);

    // Persist messages whenever they change
    useEffect(() => {
        const sid = localStorage.getItem('ms_sid_react');
        if (sid && messages.length > 1) { // Don't persist just the welcome message
            localStorage.setItem(`ms_msgs_${sid}`, JSON.stringify(messages));
        }
    }, [messages]);

    // Handle external popup triggers from the tracker/n8n
    useEffect(() => {
        const handleEngagementPopup = (event) => {
            const { message } = event.detail;
            if (!message) return;

            console.log(`[MoonshotChat] Received engagement popup event! Message: "${message}"`);
            const sid = localStorage.getItem('ms_sid_react');

            if (!isOpen) {
                console.log('[MoonshotChat] Chat is closed. Setting notification bubble.');
                setNotification(message);
                if (sid) localStorage.setItem(`ms_notif_pending_${sid}`, message);
            } else {
                console.log('[MoonshotChat] Chat is already open. Adding message to conversation.');
                setMessages(prev => [...prev, { text: message, isUser: false }]);
            }
        };

        window.addEventListener('ms-engagement-popup', handleEngagementPopup);
        return () => window.removeEventListener('ms-engagement-popup', handleEngagementPopup);
    }, [isOpen]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorderRef.current.mimeType || 'audio/webm' });
                
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = async () => {
                    const base64data = reader.result;
                    
                    try {
                        const response = await fetch('/api/transcribe', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                audio: base64data,
                                mimeType: audioBlob.type
                            })
                        });
                        
                        const data = await response.json();
                        if (data.transcript) {
                            setInputValue(prev => prev ? `${prev} ${data.transcript}` : data.transcript);
                        }
                    } catch (err) {
                        console.error('Transcription fetch error', err);
                    }
                };
                
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error('Error accessing microphone', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const formatProactiveMessage = (msg) => {
        if (!msg) return msg;
        const userName = localStorage.getItem('ms_user_name') || '';
        if (userName && !msg.toLowerCase().startsWith('hi ') && !msg.toLowerCase().startsWith('hello ')) {
            return `Hi ${userName}! ${msg}`;
        }
        return msg;
    };

    const toggleChat = () => {
        if (!isOpen && notification) {
            const sid = localStorage.getItem('ms_sid_react');
            const sanitizedMsg = formatProactiveMessage(notification);
            setMessages(prev => [...prev, { text: sanitizedMsg, isUser: false }]);
            setNotification(null);
            if (sid) localStorage.removeItem(`ms_notif_pending_${sid}`);
        }
        setIsOpen(!isOpen);
    };

    const handleNotificationClick = () => {
        const sid = localStorage.getItem('ms_sid_react');
        const sanitizedMsg = formatProactiveMessage(notification);
        setMessages(prev => [...prev, { text: sanitizedMsg, isUser: false }]);
        setNotification(null);
        if (sid) localStorage.removeItem(`ms_notif_pending_${sid}`);
        setIsOpen(true);
    };

    const getSessionId = () => {
        let sid = localStorage.getItem('ms_sid_react');
        if (!sid) {
            sid = 'sr_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('ms_sid_react', sid);
        }
        return sid;
    };

    const filterChips = (chips) => {
        if (Math.random() < 0.2) return [];

        const filtered = chips.filter(c => (shownChips[c] || 0) < 2);
        let final = filtered.slice(0, 3);
        if (final.length === 3 && Math.random() < 0.7) {
            final = final.slice(0, 2);
        }

        const nextShown = { ...shownChips };
        final.forEach(c => {
            nextShown[c] = (nextShown[c] || 0) + 1;
        });
        setShownChips(nextShown);

        return final;
    };

    const handleSend = async (text) => {
        const messageText = text || inputValue;
        if (!messageText.trim()) return;

        setMessages(prev => [...prev, { text: messageText, isUser: true }]);
        setInputValue('');
        setSuggestions([]);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: messageText,
                    sessionId: getSessionId(),
                    user_id: localStorage.getItem('ms_uid_react'),
                    event_type: 'user_message'
                })
            });

            const data = await response.json();
            const reply = data.response || data.output || "I'm having a bit of trouble connecting.";

            setMessages(prev => [...prev, { text: reply, isUser: false }]);

            const nextCount = messageCount + 1;
            setMessageCount(nextCount);

            const fallbacks = nextCount < 3 ? ['Our services', 'How it works'] : ['Talk to human'];
            const rawChips = data.suggestions && data.suggestions.length > 0 ? data.suggestions : fallbacks;
            setSuggestions(filterChips(rawChips));

        } catch (error) {
            setMessages(prev => [...prev, { text: "I ran into a hiccup. Please try again.", isUser: false }]);
        }
    };

    return (
        <div id="ms-chat-container" style={styles.container}>
            {/* Notification Bubble — position:fixed so it's always visible */}
            {!isOpen && notification && (
                <div style={styles.notificationBubble}>
                    {/* Header */}
                    <div style={styles.bubbleHeader}>
                        <div style={styles.bubbleAgentInfo}>
                            <div style={styles.bubbleAvatar}>🚀</div>
                            <div>
                                <div style={styles.bubbleAgentName}>Moonshot Assistant</div>
                                <div style={styles.bubbleOnlineRow}>
                                    <span style={styles.onlineDot} />
                                    <span style={styles.onlineText}>Online now</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setNotification(null);
                                const sid = localStorage.getItem('ms_sid_react');
                                if (sid) localStorage.removeItem(`ms_notif_pending_${sid}`);
                            }}
                            style={styles.closeNotification}
                            aria-label="Close"
                        >
                            ×
                        </button>
                    </div>

                    {/* Message */}
                    <div style={styles.bubbleMessageRow}>
                        <div style={styles.bubbleMessageAvatar}>🚀</div>
                        <div style={styles.notificationText}>{notification}</div>
                    </div>

                    {/* CTA */}
                    <button onClick={handleNotificationClick} style={styles.bubbleCta}>
                        Reply now →
                    </button>

                    {/* Arrow */}
                    <div style={styles.notificationArrow} />
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={toggleChat}
                style={{
                    ...styles.toggle,
                    animation: notification && !isOpen ? 'ms-pulse 2s ease-in-out infinite' : 'none'
                }}
            >
                {isOpen ? (
                    <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                    <div style={{ position: 'relative' }}>
                        <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        {notification && <div style={styles.unreadDot} />}
                    </div>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div style={styles.window}>
                    <div style={styles.header}>
                        <div style={styles.avatar}>🚀</div>
                        <div>
                            <div style={styles.headerTitle}>Moonshot Assistant</div>
                            <div style={styles.headerSub}>Online</div>
                        </div>
                    </div>

                    <div style={styles.messagesArea}>
                        {messages.map((msg, i) => (
                            <div key={i} style={{ ...styles.message, alignSelf: msg.isUser ? 'flex-end' : 'flex-start' }}>
                                <div style={{
                                    ...styles.bubble,
                                    backgroundColor: msg.isUser ? '#7c3aed' : 'rgba(255,255,255,0.08)',
                                    color: msg.isUser ? 'white' : '#e5e7eb',
                                    borderBottomRightRadius: msg.isUser ? '2px' : '12px',
                                    borderBottomLeftRadius: msg.isUser ? '12px' : '2px'
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {suggestions.length > 0 && (
                            <div style={styles.suggestions}>
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSend(s)}
                                        style={styles.chip}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div style={styles.inputArea}>
                        <div style={styles.inputWrapper}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask anything..."
                                style={styles.input}
                            />
                            <button 
                                onClick={toggleRecording} 
                                style={{ 
                                    ...styles.sendBtn, 
                                    background: isRecording ? '#ef4444' : 'transparent', 
                                    color: isRecording ? 'white' : '#6b7280',
                                    marginRight: '2px'
                                }}
                                aria-label={isRecording ? "Stop recording" : "Start recording"}
                            >
                                {isRecording ? (
                                    <svg style={{ width: 16, height: 16 }} fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" /></svg>
                                ) : (
                                    <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" /></svg>
                                )}
                            </button>
                            <button onClick={() => handleSend()} style={styles.sendBtn}>
                                <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    // Main container — just anchors the toggle button
    container: { position: 'fixed', bottom: '28px', right: '28px', zIndex: 10000, fontFamily: 'Inter, system-ui, sans-serif' },

    // Chat toggle button
    toggle: { width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(109, 40, 217, 0.55)', transition: 'transform 0.2s ease, box-shadow 0.2s ease', position: 'relative' },
    icon: { width: '28px', height: '28px', color: 'white' },
    unreadDot: { position: 'absolute', top: '-1px', right: '-1px', width: '16px', height: '16px', background: '#ef4444', borderRadius: '50%', border: '2.5px solid white' },

    // ── Notification Bubble (position: fixed, always on top) ──
    notificationBubble: {
        position: 'fixed',
        bottom: '108px',   // 28px container + 64px button + 16px gap
        right: '28px',
        zIndex: 10001,
        width: '300px',
        background: '#111827',
        borderRadius: '20px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.05)',
        overflow: 'hidden',
        animation: 'ms-slide-up 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
        fontFamily: 'Inter, system-ui, sans-serif',
    },
    bubbleHeader: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 14px 10px',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(37,99,235,0.15) 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    bubbleAgentInfo: { display: 'flex', alignItems: 'center', gap: '10px' },
    bubbleAvatar: {
        width: '36px', height: '36px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '16px', flexShrink: 0,
        boxShadow: '0 2px 8px rgba(124,58,237,0.5)',
    },
    bubbleAgentName: { fontSize: '13px', fontWeight: '700', color: '#f9fafb', letterSpacing: '-0.01em' },
    bubbleOnlineRow: { display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' },
    onlineDot: { width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' },
    onlineText: { fontSize: '11px', color: '#6ee7b7', fontWeight: '500' },
    closeNotification: { background: 'none', border: 'none', fontSize: '20px', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', lineHeight: '1', padding: '2px 4px', borderRadius: '6px', transition: 'color 0.15s' },

    bubbleMessageRow: { display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '14px 14px 10px' },
    bubbleMessageAvatar: {
        width: '28px', height: '28px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '13px', flexShrink: 0, marginTop: '2px',
    },
    notificationText: { fontSize: '14px', lineHeight: '1.65', color: '#e5e7eb', fontWeight: '400' },

    bubbleCta: {
        display: 'block', width: 'calc(100% - 28px)', margin: '0 14px 14px',
        padding: '10px 16px',
        background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)',
        border: 'none', borderRadius: '12px',
        color: 'white', fontSize: '13px', fontWeight: '600',
        cursor: 'pointer', letterSpacing: '0.01em',
        transition: 'opacity 0.15s',
        boxShadow: '0 4px 16px rgba(124,58,237,0.4)',
    },
    notificationArrow: {
        position: 'absolute', bottom: '-9px', right: '30px',
        width: '0', height: '0',
        borderLeft: '9px solid transparent',
        borderRight: '9px solid transparent',
        borderTop: '9px solid #111827',
    },

    // Chat window
    window: { position: 'fixed', bottom: '108px', right: '28px', zIndex: 10001, width: '380px', height: '580px', background: '#0e0e14', border: '1px solid rgba(124, 58, 237, 0.25)', borderRadius: '20px', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)', overflow: 'hidden' },
    header: { background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' },
    avatar: { width: '36px', height: '36px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' },
    headerTitle: { fontSize: '14px', fontWeight: 'bold', color: 'white' },
    headerSub: { fontSize: '11px', color: 'rgba(255,255,255,0.7)' },
    messagesArea: { flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' },
    message: { display: 'flex', maxWidth: '85%' },
    bubble: { padding: '10px 14px', borderRadius: '12px', fontSize: '14px', lineHeight: '1.5' },
    suggestions: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' },
    chip: { background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', color: '#c4b5fd', borderRadius: '18px', padding: '5px 12px', fontSize: '12px', cursor: 'pointer' },
    inputArea: { padding: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' },
    inputWrapper: { display: 'flex', gap: '8px', background: 'white', borderRadius: '24px', padding: '4px 6px 4px 14px', alignItems: 'center' },
    input: { flex: 1, border: 'none', outline: 'none', fontSize: '14px', color: '#1a1a1a', padding: '6px 0' },
    sendBtn: { width: '32px', height: '32px', borderRadius: '50%', background: '#7c3aed', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
};

if (typeof document !== 'undefined') {
    const styleEl = document.getElementById('ms-chat-styles');
    if (!styleEl) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'ms-chat-styles';
        styleSheet.innerText = `
            @keyframes ms-slide-up {
                from { transform: translateY(24px) scale(0.95); opacity: 0; }
                to   { transform: translateY(0)     scale(1);    opacity: 1; }
            }
            @keyframes ms-pulse {
                0%   { box-shadow: 0 4px 24px rgba(124,58,237,0.55), 0 0 0 0   rgba(124,58,237,0.6); }
                70%  { box-shadow: 0 4px 24px rgba(124,58,237,0.55), 0 0 0 18px rgba(124,58,237,0);   }
                100% { box-shadow: 0 4px 24px rgba(124,58,237,0.55), 0 0 0 0   rgba(124,58,237,0);   }
            }
            #ms-chat-container button:hover { opacity: 0.9; }
        `;
        document.head.appendChild(styleSheet);
    }
}

export default MoonshotChat;
