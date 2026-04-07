// Chat Widget — Enhanced with AI Suggestion Chips
// Secure API via Vercel Serverless Functions

// ─── DOM Elements ─────────────────────────────────────────────────────────────
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const micButton = document.getElementById('mic-button');
const recordingStatus = document.getElementById('recording-status');
const chatIcon = document.querySelector('.chat-icon');
const closeIcon = document.querySelector('.close-icon');

// ─── State ─────────────────────────────────────────────────────────────────────
let isRecording = false;
let mediaRecorder = null;
let audioStream = null;
let audioChunks = [];
let recordedMimeType = 'audio/webm';
let isSending = false;

// ─── Fallback suggestion chips (shown when n8n doesn't return suggestions) ─────
const FALLBACK_SUGGESTIONS = [
    'Tell me more',
    'Our services',
    'Get a quote',
    'How it works',
];

// ─── Audio MIME type detection ─────────────────────────────────────────────────
function getSupportedMimeType() {
    const candidates = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/ogg',
        'audio/mp4;codecs=mp4a',
        'audio/mp4',
    ];
    for (const type of candidates) {
        if (MediaRecorder.isTypeSupported(type)) return type;
    }
    return '';
}

// ─── Toggle chat window ────────────────────────────────────────────────────────
chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
    chatIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
});

// ─── Hook initial suggestion chips ────────────────────────────────────────────
document.querySelectorAll('#initial-suggestions .suggestion-chip').forEach(btn => {
    btn.addEventListener('click', () => handleSuggestionClick(btn));
});

// ─── Send on button click ──────────────────────────────────────────────────────
sendButton.addEventListener('click', () => {
    if (isSending) return;
    const message = chatInput.value.trim();
    if (message) { sendMessage(message); chatInput.value = ''; }
});

// ─── Send on Enter ─────────────────────────────────────────────────────────────
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !isSending) {
        const message = chatInput.value.trim();
        if (message) { sendMessage(message); chatInput.value = ''; }
    }
});

// ─── Mic button ────────────────────────────────────────────────────────────────
micButton.addEventListener('click', async () => {
    if (!isRecording) await startRecording();
    else stopRecording();
});

// ─── Add a message bubble ──────────────────────────────────────────────────────
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;

    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    return messageDiv;
}

// ─── Render AI suggestion chips after a bot message ───────────────────────────
function renderSuggestions(suggestions) {
    if (!suggestions || !Array.isArray(suggestions) || suggestions.length === 0) return;

    const container = document.createElement('div');
    container.className = 'suggestions-container';

    suggestions.forEach(text => {
        const chip = document.createElement('button');
        chip.className = 'suggestion-chip';
        chip.textContent = text;
        chip.addEventListener('click', () => handleSuggestionClick(chip));
        container.appendChild(chip);
    });

    chatMessages.appendChild(container);
    scrollToBottom();
}

// ─── Suggestion chip click handler ────────────────────────────────────────────
function handleSuggestionClick(chip) {
    const text = chip.textContent.trim();

    // Mark all chips in this group as used
    const siblings = chip.closest('.suggestions-container');
    if (siblings) {
        siblings.querySelectorAll('.suggestion-chip').forEach(c => c.classList.add('used'));
    }

    sendMessage(text);
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function showTypingIndicator() {
    if (document.getElementById('typing-indicator')) return;
    const div = document.createElement('div');
    div.className = 'message bot-message';
    div.id = 'typing-indicator';
    div.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    chatMessages.appendChild(div);
    scrollToBottom();
}

function removeTypingIndicator() {
    document.getElementById('typing-indicator')?.remove();
}

// ─── Lock / unlock input ───────────────────────────────────────────────────────
function setInputLocked(locked) {
    isSending = locked;
    sendButton.disabled = locked;
    chatInput.disabled = locked;
    chatInput.placeholder = locked ? 'Waiting for reply…' : 'Ask anything…';
}

// ─── Scroll helper ─────────────────────────────────────────────────────────────
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ─── Send message with retry logic ────────────────────────────────────────────
async function sendMessage(text, { retryCount = 0 } = {}) {
    if (retryCount === 0) {
        addMessage(text, true);
        setInputLocked(true);
    }

    showTypingIndicator();

    // Show "still thinking" notice after 15s
    const slowNoticeTimer = retryCount === 0
        ? setTimeout(() => {
            const notice = document.createElement('div');
            notice.id = 'slow-notice';
            notice.style.cssText = 'font-size:11px;color:#999;text-align:center;padding:2px 0 4px;';
            notice.textContent = 'Still working on it…';
            chatMessages.appendChild(notice);
            scrollToBottom();
        }, 15000)
        : null;

    try {
        const controller = new AbortController();
        const clientTimeout = setTimeout(() => controller.abort(), 58000);

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
                message: text,
                timestamp: new Date().toISOString(),
                sessionId: getSessionId()
            })
        });

        clearTimeout(clientTimeout);
        clearTimeout(slowNoticeTimer);
        document.getElementById('slow-notice')?.remove();
        removeTypingIndicator();

        const data = await response.json();

        if (!response.ok) {
            const serverMsg = data?.response || data?.message;
            if (serverMsg) {
                addMessage(serverMsg, false);
            } else if (retryCount < 1) {
                setInputLocked(false);
                await delay(2500);
                return sendMessage(text, { retryCount: retryCount + 1 });
            } else {
                addMessage("I'm having trouble right now — please try again in a moment.", false);
            }
            setInputLocked(false);
            return;
        }

        const botResponse = data.response || data.message;
        if (botResponse && botResponse.trim()) {
            addMessage(botResponse.trim(), false);
            // Render AI suggestion chips — fall back to defaults if n8n didn't return any
            const chips = (Array.isArray(data.suggestions) && data.suggestions.length > 0)
                ? data.suggestions
                : FALLBACK_SUGGESTIONS;
            renderSuggestions(chips);
        } else if (retryCount < 1) {
            setInputLocked(false);
            await delay(2000);
            return sendMessage(text, { retryCount: retryCount + 1 });
        } else {
            addMessage("I didn't catch that — could you send it again?", false);
        }

    } catch (error) {
        clearTimeout(slowNoticeTimer);
        document.getElementById('slow-notice')?.remove();
        removeTypingIndicator();

        const isTimeout = error.name === 'AbortError';
        console.error(`Send error (attempt ${retryCount + 1}):`, error.message);

        if (retryCount < 1 && !isTimeout) {
            setInputLocked(false);
            await delay(3000);
            return sendMessage(text, { retryCount: retryCount + 1 });
        }

        addMessage(
            isTimeout
                ? "I'm taking longer than usual — please try sending again."
                : "I ran into a hiccup — please try again in a moment.",
            false
        );
    } finally {
        setInputLocked(false);
    }
}

// ─── Utility: promise-based delay ──────────────────────────────────────────────
const delay = ms => new Promise(r => setTimeout(r, ms));

// ─── Session ID ────────────────────────────────────────────────────────────────
function getSessionId() {
    let id = localStorage.getItem('chat_session_id');
    if (!id) {
        id = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('chat_session_id', id);
    }
    return id;
}

// ─── Start recording ───────────────────────────────────────────────────────────
async function startRecording() {
    try {
        audioStream = await navigator.mediaDevices.getUserMedia({
            audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }
        });

        audioChunks = [];
        const mimeType = getSupportedMimeType();
        mediaRecorder = new MediaRecorder(audioStream, mimeType ? { mimeType } : {});
        recordedMimeType = mediaRecorder.mimeType || mimeType || 'audio/webm';

        mediaRecorder.ondataavailable = e => { if (e.data.size > 0) audioChunks.push(e.data); };
        mediaRecorder.onstop = async () => {
            const blob = new Blob(audioChunks, { type: recordedMimeType });
            if (blob.size === 0) { addMessage('No audio captured. Please try again.', false); return; }
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = async () => {
                await transcribeAudio(reader.result.split(',')[1], recordedMimeType);
            };
        };

        mediaRecorder.start(250);
        isRecording = true;
        micButton.classList.add('recording');
        recordingStatus.classList.remove('hidden');
        document.querySelector('.mic-icon').classList.add('hidden');
        document.querySelector('.mic-recording').classList.remove('hidden');

    } catch (err) {
        console.error('Mic error:', err);
        addMessage('Could not access microphone. Please check permissions.', false);
    }
}

// ─── Stop recording ────────────────────────────────────────────────────────────
function stopRecording() {
    isRecording = false;
    if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    if (audioStream) audioStream.getTracks().forEach(t => t.stop());
    micButton.classList.remove('recording');
    recordingStatus.classList.add('hidden');
    document.querySelector('.mic-icon').classList.remove('hidden');
    document.querySelector('.mic-recording').classList.add('hidden');
    mediaRecorder = null;
    audioStream = null;
}

// ─── Transcribe audio ──────────────────────────────────────────────────────────
async function transcribeAudio(base64Audio, mimeType) {
    try {
        showTypingIndicator();

        const response = await fetch('/api/transcribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ audio: base64Audio, mimeType })
        });

        removeTypingIndicator();

        if (!response.ok) throw new Error(`Transcription error: ${response.status}`);

        const data = await response.json();

        if (data.transcript && data.transcript.trim()) {
            sendMessage(data.transcript.trim());
        } else {
            addMessage('Could not understand audio. Please speak clearly and try again.', false);
        }

    } catch (err) {
        console.error('Transcription error:', err);
        removeTypingIndicator();
        addMessage('Error transcribing audio. Please try again.', false);
    }
}

// ─── Magnetic & Organic Interaction ────────────────────────────────────────────
document.addEventListener('mousemove', (e) => {
    // Only run if chat is open
    if (chatWindow.classList.contains('hidden')) return;

    // Elements that should react to the cursor
    const magneticElements = document.querySelectorAll('.message-content, .send-button, .mic-button');
    const triggerDistance = 50; // 50px radius as requested
    const pullStrength = 0.15;

    magneticElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        // Calculate dynamic radius to encompass the element plus 50px
        const activeRadius = triggerDistance + Math.max(rect.width, rect.height) / 2;

        if (distance < activeRadius) {
            // Apply magnetic pull
            const moveX = distX * pullStrength;
            const moveY = distY * pullStrength;
            
            // Cap movement for subtlety
            const maxMove = el.classList.contains('message-content') ? 6 : 10;
            const finalX = Math.max(-maxMove, Math.min(maxMove, moveX));
            const finalY = Math.max(-maxMove, Math.min(maxMove, moveY));
            
            let scale = '';
            if (el.classList.contains('send-button') || el.classList.contains('mic-button')) {
                scale = distance < rect.width ? 'scale(1.1) ' : 'scale(1.05) ';
            }

            el.style.transform = `${scale}translate(${finalX}px, ${finalY}px)`;
            
            if (el.classList.contains('message-content')) {
                // organic liquid movement adjustments
                el.style.transition = 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), border-radius 0.3s ease';
            }
        } else {
            // Reset state
            el.style.transform = '';
            if (el.classList.contains('message-content')) {
                el.style.transition = ''; // Return to default css transition
            }
        }
    });
});

console.log('🚀 Moonshot chat widget initialised with modern bubbly aesthetic & magnetic interactions');