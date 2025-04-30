const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  //   if (req.method !== "POST") {
  //     return res.status(405).json({ message: "Method not allowed" });
  //   }

  console.log(req.method);
  const userEmail = email;
  const bookingReceiver = "gtechong72@gmail.com";

  const {
    name,
    email,
    phone,
    destPackage,
    destination,
    travelers,
    dates,
    notes,
    paymentOption,
    due,
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: userEmail,
      pass: "baxhrkzjjlsznotf",
    },
  });

  const mailOptions = {
    from: `"Palanca Safari Booking" <${userEmail}>`,
    to: bookingReceiver,
    subject: `New Booking From ${name}`,
    text: `
    New Booking Details:
    Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Package: ${destPackage}
    Destination: ${destination}
    Travelers: ${travelers}
    Dates: ${dates}
    Notes: ${notes}
    Payment Option: ${paymentOption}
    Total Due: $${due}
    This email was sent to ${email} if you have any questions kindly contact us reservations@palancasafari.com
    `,

    // html: `
    //     <div style='font-family: Arial, sans-serif; max-'></div>
    //     `,
  };

  try {
    await transporter.sendMail(mailOptions);
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
