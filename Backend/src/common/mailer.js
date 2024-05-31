import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

export async function sendResetPasswordMail(email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const token = jwt.sign({ email }, process.env.KEY);

  // send mail with defined transport object
  const info = await transporter
    .sendMail({
      to: email,
      subject: "Reset Your Password",
      html: `<p>Click <a href="${process.env.FRONTENDURL}/resetPassword?token=${token}">here</a> to Reset Your Password.</p>`,
    })
    .catch((e) => {
      console.log(e);
      throw new Error(e);
    });

  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}
