import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER as string;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD as string;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

export const sendContactEmail = async (
  name: string,
  email: string,
  phone: string,
  city: string,
  state: string,
  message: string,
) => {
  await transporter.sendMail({
    from: `"Opa Food" <${EMAIL_USER}>`,
    to: EMAIL_USER,
    subject: "New Contact Message - Opa Food",

    html: `
      <h2>New Contact Message</h2>

      <p><strong>Name:</strong> ${name}</p>

      <p><strong>Email:</strong> ${email}</p>

      <p><strong>Phone:</strong> ${phone}</p>

      <p><strong>City:</strong> ${city}</p>

      <p><strong>State:</strong> ${state}</p>

      <hr>

      <p><strong>Message:</strong></p>

      <p>${message}</p>
    `,
  });
};
