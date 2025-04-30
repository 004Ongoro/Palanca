const nodemailer = require("nodemailer");

export default async function handler(req, res) {
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

  const userEmail = email;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: bookingReceiver,
      pass: "baxhrkzjjlsznotf",
    },
  });

  const mailOptions = {
  from: `"Palanca Safari Booking" <gtechong72@gmail.com>`,
  to: "gtechong72@gmail.com",
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
            <tr>
              <td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Name:</td>
              <td style="padding: 8px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Email:</td>
              <td style="padding: 8px;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Phone:</td>
              <td style="padding: 8px;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Package:</td>
              <td style="padding: 8px;">${destPackage}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Destination:</td>
              <td style="padding: 8px;">${destination}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Travelers:</td>
              <td style="padding: 8px;">${travelers}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Dates:</td>
              <td style="padding: 8px;">${dates}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Payment Option:</td>
              <td style="padding: 8px;">${paymentOption}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Total Due:</td>
              <td style="padding: 8px;">$${due}</td>
            </tr>
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
  from: `"Palanca Safari & Travel" <gtechong72@gmail.com>`,
  to: email,
  subject: `Booking Confirmation - Palanca Safari & Travel`,
  html: `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #fefefe; padding: 20px; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; border-radius: 10px; background: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background: #e3f4f4; padding: 20px; text-align: center;">
          <img src="https://palanca-kohl.vercel.app/logo.png" alt="Palanca Safari & Travel" style="width: 120px; margin-bottom: 10px;" />
          <h2 style="margin: 0; color: #2c3e50;">Thank You for Booking!</h2>
          <p style="margin-top: 5px; color: #555;">Your trip is almost set 🧳</p>
        </div>

        <div style="padding: 20px;">
          <p>Hello <strong>${name}</strong>,</p>
          <p>We’ve received your booking and our team is reviewing it. You will receive a follow-up shortly. Below are your booking details for your reference:</p>

          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr><td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Package:</td><td style="padding: 8px;">${package}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Destination:</td><td style="padding: 8px;">${destination}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Travelers:</td><td style="padding: 8px;">${travelers}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Dates:</td><td style="padding: 8px;">${dates}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Payment Option:</td><td style="padding: 8px;">${paymentOption}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; background: #f0f8ff;">Total Due:</td><td style="padding: 8px;">$${totalDue}</td></tr>
          </table>

          ${
            Notes
              ? `<p style="margin-top: 10px;"><strong>Additional Notes:</strong> ${notes}</p>`
              : ""
          }

          <div style="margin-top: 30px; text-align: center;">
            <a href="https://palanca-kohl.vercel.app" style="background: #7ec8c8; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; display: inline-block; margin: 5px;">Visit Our Site</a>
            <a href="mailto:reservations@palancasafari.com" style="background: #ffe0b2; color: #333; padding: 10px 20px; border-radius: 6px; text-decoration: none; display: inline-block; margin: 5px;">Contact Us</a>
          </div>

          <p style="margin-top: 30px;">If any of the information above is incorrect, please contact us immediately at <a href="mailto:reservations@palancasafari.com">reservations@palancasafari.com</a>.</p>
        </div>

        <div style="background: #f7fdfd; padding: 20px; text-align: center; font-size: 14px; color: #555;">
          &copy; ${new Date().getFullYear()} Palanca Safari & Travel. All rights reserved.
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
}
