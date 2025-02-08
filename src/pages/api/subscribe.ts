
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'Movie Blog <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to The Screen Scholar Newsletter',
      text: `Thank you for subscribing to The Screen Scholar newsletter! We're excited to share our cinematic journey with you.`,
    });

    if (error) {
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
