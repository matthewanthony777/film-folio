
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from 'npm:resend@2.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Log the request method and headers for debugging
    console.log('Request method:', req.method);
    console.log('Request headers:', Object.fromEntries(req.headers.entries()));

    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    const { email } = await req.json();
    
    // Log the attempt to help with debugging
    console.log('Attempting to send email to:', email);
    
    const apiKey = Deno.env.get('RESEND_API_KEY');
    if (!apiKey) {
      console.error('No Resend API key found');
      throw new Error('Resend API key not configured');
    }
    
    const resend = new Resend(apiKey);
    
    // In development, we can only send to the verified email
    const toEmail = "theinverseinnovator@gmail.com"; // The verified email address

    const { data, error } = await resend.emails.send({
      from: 'theinverseinnovator@resend.dev',
      to: [toEmail],
      subject: 'Welcome to The Screen Scholar Newsletter',
      html: `
        <h1>Welcome to The Screen Scholar Newsletter!</h1>
        <p>Thank you for subscribing to our newsletter. We're excited to share our cinematic journey with you.</p>
        <p>Stay tuned for exclusive content, insights, and updates about the world of cinema.</p>
        <p><small>Note: This is a development test. The subscription request came from: ${email}</small></p>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        data,
        message: "Subscription successful! During development, confirmation emails are sent to the verified email address."
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to subscribe',
        details: error instanceof Error ? error.stack : undefined 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
