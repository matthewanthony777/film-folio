
import { Resend } from 'resend';
import express, { Request, Response, Router } from 'express';
import cors from 'cors';

const router = Router();
router.use(cors());
router.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      console.error('No email provided in request body');
      return res.status(400).json({ error: 'Email is required' });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    console.log('Attempting to send email to:', email);

    const { data, error } = await resend.emails.send({
      from: 'Movie Blog <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to The Screen Scholar Newsletter',
      text: `Thank you for subscribing to The Screen Scholar newsletter! We're excited to share our cinematic journey with you.`,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(400).json({ error });
    }

    console.log('Email sent successfully:', data);
    return res.status(200).json({ data });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Failed to subscribe', details: error.message });
  }
});

export default router;
