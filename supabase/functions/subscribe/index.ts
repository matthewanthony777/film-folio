
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from 'npm:resend';

const resend = new Resend(Deno.env.get('RESEND_AUDIENCE_API_KEY'));

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

    const { data, error } = await resend.emails.send({
      from: 'Movie Blog <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to The Screen Scholar Newsletter',
      text: `Thank you for subscribing to The Screen Scholar newsletter! We're excited to share our cinematic journey with you.`,
    });

    if (error) {
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
    return new Response(
      JSON.stringify({ error: 'Failed to subscribe' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
