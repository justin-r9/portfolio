
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API Key from environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (!resend) {
            console.warn('RESEND_API_KEY is missing. Simulating email send.');
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            return NextResponse.json({ id: 'mock-id', message: 'Email simulated (missing API key)' });
        }

        // Send email
        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Use validated domain or default for testing
            to: ['contact@iyidobi.com'], // Updated to user's real email
            subject: `New Contact Form Submission from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Message:
${message}
            `,
            replyTo: email,
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error('Resend Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
