const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "reservations@palancasafari.com",
      pass: process.env.ZOHO_RES_PASSWORD,
    },
  });

  // HTML email to palanca
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; font-size: 1.1rem; color: #333;">
      <img src="https://palancasafari.com/logo.png" alt="Palanca Safari & Travel" style="width: 200px;" />
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "N/A"}</p>
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
  <div style="font-family: Arial, sans-serif; font-size: 1.1rem; color: #333; background-color: #f9f9f9; padding: 40px 20px;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://palancasafari.com/logo.png" alt="Palanca Safari & Travel" style="width: 180px; margin-bottom: 10px;" />
      </div>

      <h2 style="color: #005f40;">Thank You for Contacting Palanca Safari & Travel</h2>
      <p>Hi ${name},</p>
      <p>Thank you for reaching out! We've received your message and a member of our team will get back to you shortly.</p>

      <div style="margin: 30px 0; padding: 20px; background-color: #f1f5f9; border-left: 4px solid #007bff;">
        <p style="margin: 0;"><strong>Your Message:</strong></p>
        <p style="white-space: pre-line; margin-top: 8px;">${message}</p>
      </div>

      <h3 style="margin-top: 30px; color: #005f40;">About Palanca Safari & Travel</h3>
      <p>We specialize in unforgettable safari adventures and tailored travel experiences in Angola and beyond. Whether you're exploring wildlife or seeking cultural immersion, we're your trusted travel partner.</p>

      <p style="margin-top: 20px;">
        <a href="https://www.palancasafari.com/" style="color: #007bff; text-decoration: none;">Visit our website</a><br/>
        <a href="https://www.palancasafari.com/about/" style="color: #007bff; text-decoration: none;"> Learn more about us</a><br/>
        <a href="mailto:palancasafari.andtravel@gmail.com" style="color: #007bff; text-decoration: none;"> Contact Support</a>
      </p>

      <p style="margin-top: 2rem;">Warm regards,<br/><strong>The Palanca Safari & Travel Team</strong></p>
    </div>

    <footer style="max-width: 600px; margin: 20px auto 0; text-align: center; color: #777; font-size: 0.9rem;">
      <p style="margin: 0;">© ${new Date().getFullYear()} Palanca Safari & Travel. All rights reserved. <br /> This email was sent to ${email} after contacting us via our website contact page.</p>
      
      <p style="margin: 0;">
        <a href="https://palancasafari.com/legal/privacy-policy/" style="color: #777; text-decoration: underline;">Privacy Policy</a>
      </p>
    </footer>
  </div>
`;

  try {
    await transporter.sendMail({
      from: '"Palanca Safari & Travel" <reservations@palancasafari.com>',
      to: "reservations@palancasafari.com",
      subject: `New Contact from ${name}`,
      html: adminHtml,
      replyTo: email,
    });

    await transporter.sendMail({
      from: '"Palanca Safari & Travel" <reservations@palancasafari.com>',
      to: email,
      subject: "We received your message!",
      html: userHtml,
    });

    return res.status(200).json({ message: "Emails sent successfully." });
  } catch (err) {
    return res.status(500).json({ message: "Email sending failed.", err });
  }
};
