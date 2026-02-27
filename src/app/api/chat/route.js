import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const n8nBaseUrl = process.env.N8N_BASE_URL;

        if (!n8nBaseUrl) {
            return NextResponse.json({ error: 'N8N_BASE_URL not configured' }, { status: 500 });
        }

        const webhookId = '390cc442-7588-4290-b9df-1e4522f46b18';
        const response = await fetch(`${n8nBaseUrl}/webhook/${webhookId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('N8N Error:', errorText);
            return NextResponse.json({ error: 'Failed to fetch from n8n' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
