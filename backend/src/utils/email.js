import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export const sendConfirmationEmail = async (
  customerEmail,
  transactionOutcome,
  orderNumber,
  productInfo,
  customerInfo
) => {
  try {
    const mailOption = {
      from: process.env.EMAIL_FROM,
      to: customerEmail,
      subject: `🛒 Order ${orderNumber} - ${transactionOutcome.toUpperCase()}`,
      html: `
      <div style="font-family: 'Arial', sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
  <div style="text-align: center; padding-bottom: 20px;">
    <img src="https://via.placeholder.com/150" alt="RootShop" style="max-width: 120px; margin-bottom: 15px;">
    <h2 style="color: #4CAF50;">Order ${
      transactionOutcome === "approved"
        ? "Confirmed ✅"
        : "Status: " + transactionOutcome
    }</h2>
  </div>

  <p style="font-size: 16px; line-height: 1.5;">Hi ${customerInfo.fullName},</p>

  <p style="font-size: 16px; line-height: 1.5; margin-bottom: 15px;">Thank you for your order. Here are the details:</p>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
    <tr style="background-color: #f9f9f9;">
      <td style="padding: 10px; font-weight: bold; color: #555;">Order No:</td>
      <td style="padding: 10px; color: #555;">${orderNumber}</td>
    </tr>
    <tr>
      <td style="padding: 10px; font-weight: bold; color: #555;">Product:</td>
      <td style="padding: 10px; color: #555;">${productInfo.title}</td>
    </tr>
    <tr style="background-color: #f9f9f9;">
      <td style="padding: 10px; font-weight: bold; color: #555;">Quantity:</td>
      <td style="padding: 10px; color: #555;">${productInfo.quantity}</td>
    </tr>
    <tr>
      <td style="padding: 10px; font-weight: bold; color: #555;">Status:</td>
      <td style="padding: 10px; color: #555;">${transactionOutcome}</td>
    </tr>
  </table>

  <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px; font-weight: bold; color: #333;">Total: ₹${
    productInfo.quantity * productInfo.price
  }</p>

  <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #28a745; color: white; border-radius: 5px;">
    <p style="margin: 0; font-size: 16px;">We will notify you once it's on the way!</p>
  </div>

  <p style="font-size: 16px; line-height: 1.5; margin-top: 30px;">Best regards,<br>Your Store Team</p>

  <p style="text-align: center; font-size: 12px; color: #888;">If you have any questions, feel free to contact us at support@rootshop.com</p>
</div>

      `,
    };
    await transporter.sendMail(mailOption);
    console.log("✅ Email sent to:", customerEmail);
  } catch (error) {
    console.error("❌ Email failed:", error.message);
  }
};
