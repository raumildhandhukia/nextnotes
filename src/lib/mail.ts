import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${DOMAIN}/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `<p><a href="${confirmLink}">Click here to verify your email</a> for Next Notes account.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `${DOMAIN}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p><a href="${confirmLink}">Click here to reset your password</a> for Next Notes account.</p>`,
  });
};
