
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

    const { data, error } = await resend.emails.send({
      from: 'Movie Blog <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to The Screen Scholar Newsletter',
      text: `Thank you for subscribing to The Screen Scholar newsletter! We're excited to share our cinematic journey with you.`,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
});

export default router;
