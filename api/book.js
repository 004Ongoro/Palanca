const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }


  const bookingReceiver = "reservations@palancasafari.com";

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

  // // Validate required fields
  // if (
  //   !name ||
  //   !email ||
  //   !phone ||
  //   !destPackage ||
  //   !destination ||
  //   !dates ||
  //   !travelers ||
  //   !paymentOption ||
  //   !due
  // ) {
  //   return res
  //     .status(400)
  //     .json({ message: "Missing required booking fields." });
  // }

  const formattedDue = parseFloat(due).toFixed(2);
  const packageSlug = destPackage.toLowerCase().replace(/\s+/g, "-");

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "reservations@palancasafari.com",
      pass: process.env.ZOHO_RES_PASSWORD,
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
            <img src="https://palancasafari.com/logo.png" alt="Palanca Safari & Travel" style="width: 120px; margin-bottom: 10px;" />
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
              <tr><td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Total Due:</td><td style="padding: 8px;">$${formattedDue}</td></tr>
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

  const confirmationMailOptions = {
    from: `"Palanca Safari & Travel" <${bookingReceiver}>`,
    to: email,
    subject: `Booking Confirmed - Palanca Safari & Travel`,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; background-color: #f9fdfd; padding: 40px; color: #333;">
        <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.1);">
          <div style="background: #f2f4f5; padding: 30px; text-align: center;">
            <img src="https://palancasafari.com/logo.png" alt="Palanca Safari & Travel" style="height: 60px;" />
            <h1 style="margin: 15px 0 5px; color: #333; font-size: 24px;">Booking Confirmation</h1>
            <p style="margin: 0; color: #555; font-size: 17px;">Thank you for choosing Palanca Safari & Travel!</p>
          </div>

          <div style="padding: 35px 30px; font-size: 17px; line-height: 1.6;">
            <p>Dear <strong>${name}</strong>,</p>
            <p>We are delighted to confirm your booking for the <strong>${destPackage}</strong> package. Our team is currently reviewing your details to prepare an exceptional travel experience tailored just for you.</p>
            <p><strong>What does this mean?</strong><br/>
            Your request has been successfully submitted. We will now begin the process of confirming hotel availability, transport, activities, and any specific preferences you've shared.</p>

            <h2 style="margin-top: 30px; color: #D4AF37; font-size: 20px;">Booking Summary</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 17px;">
              <tr><td style="padding: 10px 0; font-weight: bold;">Destination:</td><td>${destination}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: bold;">Travel Dates:</td><td>${dates}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: bold;">Number of Travelers:</td><td>${travelers}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: bold;">Payment Option:</td><td>${paymentOption}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: bold;">Total Due:</td><td><strong>$${formattedDue}</strong></td></tr>
            </table>

            ${
              notes
                ? `<p style="margin-top: 20px;"><strong>Additional Notes:</strong><br>
                <span style="display: block; margin-top: 5px; background: #f8f8f8; padding: 15px; border-left: 4px solid #D4AF37; border-radius: 4px;">
                  ${notes}
                </span></p>`
                : ""
            }

            <h2 style="margin-top: 40px; font-size: 20px; color: #D4AF37;">What Happens Next</h2>
            <ul style="margin-left: 20px; padding-left: 10px;">
              <li>Our travel expert will review your booking details within the next 24–48 hours.</li>
              <li>You will receive a follow-up email with any additional information or requests for clarification.</li>
              <li>We’ll finalize availability and send your full travel itinerary for approval.</li>
              <li>If you selected partial or deferred payment, payment instructions will be included in the next step.</li>
            </ul>

            <div style="margin-top: 30px; text-align: center;">
              <a href="https://palancasafari.com" style="background: #D4AF37; color: white; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold;">Continue Browsing</a>
            </div>

            <h2 style="margin-top: 40px; font-size: 20px; color: #D4AF37;">Need Help?</h2>
            <p>If you have any questions or need to update your booking, don’t hesitate to reach out to our reservations team:</p>
            <p>Email: <a href="mailto:reservations@palancasafari.com" style="color: #0077cc;">reservations@palancasafari.com</a></p>
          </div>

          <div style="background: #f2f2f2; padding: 20px; text-align: center; font-size: 14px; color: #777;">
            &copy; ${new Date().getFullYear()} Palanca Safari & Travel. All rights reserved.<br/>
            This email was sent to <strong>${email}</strong> after a booking request on our website.
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(confirmationMailOptions);

    return res.status(200).json({
      message: "Booking Sent Successfully! We Will Review it Soon.",
    });
  } catch (error) {
    console.error("Email Send Error:", error);
    return res.status(500).json({
      message: "Failed to send booking. An error occurred.",
      error: error.message,
    });
  }
};
