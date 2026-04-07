import { NextResponse } from 'next/server';

export const maxDuration = 15; // Increased slightly for stability during Deepgram peaks

export async function POST(req) {
    try {
        let body;
        try {
            body = await req.json();
        } catch {
            return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
        }

        const { audio, mimeType } = body || {};

        if (!audio) {
            return NextResponse.json({ error: 'Audio data is required' }, { status: 400 });
        }

        const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
        if (!deepgramApiKey) {
            console.error('DEEPGRAM_API_KEY not configured');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        // Strip data URL prefix if present (e.g. "data:audio/webm;base64,AAAA...")
        let base64Data = audio;
        let detectedMimeType = mimeType || 'audio/webm;codecs=opus';

        if (typeof audio === 'string' && audio.startsWith('data:')) {
            const matches = audio.match(/^data:([^;]+);base64,(.+)$/);
            if (matches) {
                detectedMimeType = matches[1];
                base64Data = matches[2];
            } else {
                return NextResponse.json({ error: 'Malformed audio data URL' }, { status: 400 });
            }
        }

        // Convert base64 to binary buffer
        let audioBuffer;
        try {
            audioBuffer = Buffer.from(base64Data, 'base64');
        } catch (bufErr) {
            console.error('Failed to decode base64 audio:', bufErr.message);
            return NextResponse.json({ error: 'Invalid base64 audio data' }, { status: 400 });
        }

        if (audioBuffer.length === 0) {
            return NextResponse.json({ error: 'Audio buffer is empty after decoding' }, { status: 400 });
        }

        // ─── Normalise the Content-Type for Deepgram ──────────────────────────
        const baseType = detectedMimeType.split(';')[0].trim().toLowerCase();

        const mimeMap = {
            'audio/x-m4a': 'audio/mp4',
            'audio/mpeg': 'audio/mp3',
            'video/webm': 'audio/webm',
            'video/mp4': 'audio/mp4',
        };

        const contentType = mimeMap[baseType] || baseType;

        console.log(`Transcribing ${audioBuffer.length} bytes | raw mimeType: "${detectedMimeType}" | sending as: "${contentType}"`);

        // Call Deepgram
        const deepgramUrl = 'https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true&punctuate=true&language=en';

        const deepgramResponse = await fetch(deepgramUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${deepgramApiKey}`,
                'Content-Type': contentType,
            },
            body: audioBuffer
        });

        const rawText = await deepgramResponse.text();

        if (!deepgramResponse.ok) {
            console.error(`Deepgram API error ${deepgramResponse.status}:`, rawText);
            return NextResponse.json(
                { error: `Deepgram API error: ${deepgramResponse.status} - ${rawText.slice(0, 300)}` },
                { status: deepgramResponse.status }
            );
        }

        let data;
        try {
            data = JSON.parse(rawText);
        } catch {
            console.error('Failed to parse Deepgram response:', rawText);
            return NextResponse.json({ error: 'Invalid JSON from Deepgram' }, { status: 500 });
        }

        const transcript = data?.results?.channels?.[0]?.alternatives?.[0]?.transcript || '';

        if (!transcript) {
            console.warn('Deepgram returned empty transcript. Full response:', JSON.stringify(data));
        }

        return NextResponse.json({ transcript, success: true }, { status: 200 });

    } catch (error) {
        console.error('Transcription error:', error.message);
        return NextResponse.json({
            error: 'Transcription failed',
            message: error.message
        }, { status: 500 });
    }
}
