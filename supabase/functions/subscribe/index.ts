
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from 'npm:resend';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    
    // Log the attempt to help with debugging
    console.log('Attempting to send email to:', email);
    
    const resend = new Resend(Deno.env.get('RESEND_AUDIENCE_API_KEY'));
    
    // Log that we got the API key (without revealing it)
    console.log('Resend API key retrieved:', !!Deno.env.get('RESEND_AUDIENCE_API_KEY'));

    const { data, error } = await resend.emails.send({
      from: 'The Screen Scholar <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to The Screen Scholar Newsletter',
      html: `
        <h1>Welcome to The Screen Scholar Newsletter!</h1>
        <p>Thank you for subscribing to our newsletter. We're excited to share our cinematic journey with you.</p>
        <p>Stay tuned for exclusive content, insights, and updates about the world of cinema.</p>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return new Response(
        JSON.stringify({ error }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ data }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to subscribe' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
