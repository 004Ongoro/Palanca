const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  console.log("Incoming Request Body:", req.body);

  const bookingReceiver = "gtechong72@gmail.com";

  const name = req.body.Name;
  const email = req.body.Email;
  const phone = req.body.Phone;
  const destPackage = req.body.Package;
  const destination = req.body.Destination;
  const travelers = req.body.Travelers;
  const dates = req.body.Dates;
  const notes = req.body.Notes;
  const paymentOption = req.body.PaymentOption;
  const due = req.body.TotalDue;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: bookingReceiver,
      pass: "baxhrkzjjlsznotf", // Consider storing this in an environment variable
    },
  });

  const mailOptions = {
    from: `"Palanca Safari Booking" <${bookingReceiver}>`,
    to: bookingReceiver,
    replyTo: email,
    subject: `New Booking From ${name}`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; background-color: #fefefe; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; border-radius: 10px; background: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
          <div style="background: #e3f4f4; padding: 20px; text-align: center;">
            <img src="https://palanca-kohl.vercel.app/logo.png" alt="Palanca Safari & Travel" style="width: 120px; margin-bottom: 10px;" />
            <h2 style="margin: 0; color: #2c3e50;">New Booking Notification</h2>
            <p style="margin-top: 5px; color: #555;">Palanca Safari & Travel</p>
          </div>

          <div style="padding: 20px;">
            <h3 style="color: #444;">Booking Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <tr><td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Name:</td><td style="padding: 8px;">${name}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Email:</td><td style="padding: 8px;">${email}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Phone:</td><td style="padding: 8px;">${phone}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Package:</td><td style="padding: 8px;">${destPackage}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Destination:</td><td style="padding: 8px;">${destination}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Travelers:</td><td style="padding: 8px;">${travelers}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Dates:</td><td style="padding: 8px;">${dates}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Payment Option:</td><td style="padding: 8px;">${paymentOption}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Total Due:</td><td style="padding: 8px;">$${due}</td></tr>
            </table>

            ${
              notes
                ? `<div style="margin-top: 20px;">
                    <h4 style="margin-bottom: 5px; color: #444;">Additional Notes</h4>
                    <p style="padding: 10px; background: #fdf6f0; border-left: 4px solid #ffccbc;">${notes}</p>
                  </div>`
                : ""
            }
          </div>

          <div style="background: #f7fdfd; padding: 20px; text-align: center; font-size: 14px; color: #555;">
            This booking was submitted via your website by <strong>${name}</strong>.<br />
            Please reply directly to <a href="mailto:${email}" style="color: #0077cc;">${email}</a> for any follow-up.
            <br /><br />
            &copy; ${new Date().getFullYear()} Palanca Safari & Travel
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);

    const confirmationMailOptions = {
  from: `"Palanca Safari & Travel" <${bookingReceiver}>`,
  to: email,
  subject: `🎉 Booking Confirmed - Palanca Safari & Travel`,
  html: `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #f9fdfd; padding: 20px; color: #333;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <div style="background: #e0f7fa; padding: 20px; text-align: center;">
          <img src="https://palanca-kohl.vercel.app/logo.png" alt="Palanca Safari & Travel" style="height: 60px;" />
          <h2 style="margin: 10px 0 5px; color: #00695c;">Booking Confirmation</h2>
          <p style="margin: 0; color: #444;">Thank you for booking with Palanca Safari & Travel!</p>
        </div>
        
        <!-- Body -->
        <div style="padding: 25px;">
          <p>Dear <strong>${name}</strong>,</p>
          <p>We are excited to confirm your booking for the <strong>${destPackage}</strong> package. Our team is currently reviewing all the details to ensure your trip goes smoothly.</p>

          <h3 style="margin-top: 30px; color: #00796b;">🧳 Booking Summary</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr><td style="padding: 8px; font-weight: bold;">Destination:</td><td style="padding: 8px;">${destination}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Travel Dates:</td><td style="padding: 8px;">${dates}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Number of Travelers:</td><td style="padding: 8px;">${travelers}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Payment Option:</td><td style="padding: 8px;">${paymentOption}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Total Due:</td><td style="padding: 8px;"><strong>$${due}</strong></td></tr>
          </table>

          ${
            notes
              ? `<p style="margin-top: 15px;"><strong>Additional Notes:</strong><br/>${notes}</p>`
              : ""
          }

          <h3 style="margin-top: 30px; color: #00796b;">📌 What Happens Next?</h3>
          <ul style="margin: 0 0 15px 20px; padding: 0;">
            <li>✅ Our travel consultant will review your booking.</li>
            <li>📞 We may contact you for any clarifications or preferences.</li>
            <li>💳 You will receive payment instructions if you chose a deferred method.</li>
            <li>📧 A detailed itinerary will follow after confirmation.</li>
          </ul>

          <h3 style="margin-top: 30px; color: #00796b;">💡 Need Help?</h3>
          <p>
            If you need to make changes to your booking or have questions, don’t hesitate to contact us:
            <br /><br />
            📧 Email: <a href="mailto:reservations@palancasafari.com" style="color: #0077cc;">reservations@palancasafari.com</a><br />
            ☎️ Phone: +1 (234) 567-890
          </p>

          <!-- Buttons -->
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://palanca-kohl.vercel.app" style="background: #00796b; color: white; padding: 12px 25px; border-radius: 6px; text-decoration: none; margin: 5px; display: inline-block;">🌐 Visit Our Website</a>
            <a href="mailto:reservations@palancasafari.com" style="background: #ffe0b2; color: #333; padding: 12px 25px; border-radius: 6px; text-decoration: none; margin: 5px; display: inline-block;">✉️ Contact Support</a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #f0f0f0; padding: 15px; text-align: center; font-size: 13px; color: #777;">
          &copy; ${new Date().getFullYear()} Palanca Safari & Travel. All rights reserved.<br/>
          This email was sent to <strong>${email}</strong> because you made a booking on our website.
        </div>

      </div>
    </div>
  `,
};


    await transporter.sendMail(confirmationMailOptions);

    return res
      .status(200)
      .json({ message: "Booking Sent Successfully! We Will Review it Soon." });
  } catch (error) {
    console.error("Email Send Error:", error);
    return res
      .status(500)
      .json({ message: "Failed to send booking. An error occurred." });
  }
};
