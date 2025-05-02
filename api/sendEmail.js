import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' });
  }

  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'palankasafari.andtravel@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // HTML email to palanca
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; font-size: 1.1rem; color: #333;">
      <img src="https://palanca-kohl.vercel.app/logo.png" alt="Palanca Safari & Travel" style="width: 200px;" />
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-line;">${message}</p>
      <p>
        <a href="mailto:${email}" style="display: inline-block; padding: 10px 15px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          Reply to ${name}
        </a>
      </p>
    </div>
  `;

  // Confirmation email to user
  const userHtml = `
    <div style="font-family: Arial, sans-serif; font-size: 1.1rem; color: #333;">
      <img src="https://palanca-kohl.vercel.app/logo.png" alt="Palanca Safari & Travel" style="width: 200px;" />
      <h2>Thank You for Contacting Palanca Safari & Travel</h2>
      <p>Hi ${name},</p>
      <p>We have received your message and our team will get back to you as soon as possible.</p>
      <p><strong>Your Message:</strong></p>
      <p style="white-space: pre-line;">${message}</p>
      <hr/>
      <h3>About Palanca Safari & Travel</h3>
      <p>We specialize in unforgettable safari adventures and tailored travel experiences in Angola and beyond. Whether you're exploring the wild or seeking cultural immersion, Palanca Safari & Travel is your trusted guide.</p>
      <p>
        <a href="https://palanca-kohl.vercel.app/" style="color: #007bff;">Visit our website</a> |
        <a href="https://palanca-kohl.vercel.app/about" style="color: #007bff;">About us</a> |
        <a href="mailto:palankasafari.andtravel@gmail.com" style="color: #007bff;">Contact Support</a>
      </p>
      <p style="margin-top: 2rem;">Warm regards,<br/>The Palanca Safari & Travel Team</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: '"Palanca Safari & Travel" <palankasafari.andtravel@gmail.com>',
      to: 'palankasafari.andtravel@gmail.com',
      subject: `New Contact from ${name}`,
      html: adminHtml,
      replyTo: email,
    });

    await transporter.sendMail({
      from: '"Palanca Safari & Travel" <palankasafari.andtravel@gmail.com>',
      to: email,
      subject: 'We received your message!',
      html: userHtml,
    });

    return res.status(200).json({ message: 'Emails sent successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Email sending failed.' });
  }
}
