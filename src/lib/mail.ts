const DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

import nodeMailer from "nodemailer";
const transporter = nodeMailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDER_GMAIL,
    pass: process.env.SENDER_GMAIL_APP_PASSWORD,
  },
});
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${DOMAIN}/auth/new-verification?token=${token}`;
  try {
    await transporter.sendMail({
      from: {
        name: "Next Notes",
        address: process.env.SENDER_GMAIL || "",
      },
      to: [email],
      subject: "Verify Your Email",
      html: `<p><a href="${confirmLink}">Click here to verify your email</a> for Next Notes account.</p>`,
    });
  } catch (err) {
    console.log(err);
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${DOMAIN}/auth/new-password?token=${token}`;
  try {
    await transporter.sendMail({
      from: {
        name: "Next Notes",
        address: process.env.SENDER_GMAIL || "",
      },
      to: [email],
      subject: "Reset Your Password",
      html: `<p><a href="${confirmLink}">Click here to reset your password</a> for Next Notes account.</p>`,
    });
  } catch (err) {
    console.log(err);
  }
};
