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

    const messagesEndRef = useRef(null);

    // Initialize engagement tracker
    useEngagementTracker(engagementApiUrl);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, suggestions]);

    // Handle external popup triggers from the tracker/n8n
    useEffect(() => {
        const handleEngagementPopup = (event) => {
            const { message } = event.detail;
            if (!message) return;

            // Only trigger if not already in an active conversation or if specifically forced
            setIsOpen(true);
            setMessages(prev => [...prev, { text: message, isUser: false }]);
        };

        window.addEventListener('ms-engagement-popup', handleEngagementPopup);
        return () => window.removeEventListener('ms-engagement-popup', handleEngagementPopup);
    }, []);

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

        // Update shown count
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
        setSuggestions([]); // Clear suggestions while thinking

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: messageText,
                    sessionId: getSessionId(),
                    event_type: 'user_message' // Explicitly mark as a message event
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
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={styles.toggle}
            >
                {isOpen ? (
                    <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                ) : (
                    <svg style={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
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
    container: { position: 'fixed', bottom: '28px', right: '28px', zIndex: 9999, fontFamily: 'sans-serif' },
    toggle: { width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 100%)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(109, 40, 217, 0.5)' },
    icon: { width: '28px', height: '28px', color: 'white' },
    window: { position: 'absolute', bottom: '80px', right: '0', width: '380px', height: '580px', background: '#0e0e14', border: '1px solid rgba(124, 58, 237, 0.25)', borderRadius: '20px', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)', overflow: 'hidden' },
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

export default MoonshotChat;
