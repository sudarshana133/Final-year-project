import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
import { Worker } from "bullmq";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const worker = new Worker(
  "email-sender-queue",
  async (job) => {
    const emailId = job.data.emailId;
    console.log(`Processing email for: ${emailId}`);
    // Send the email
    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_ID,
        to: emailId,
        subject: "Hello ✔",
        text: "This is a test bulk email",
        html: "<b>This is a test bulk email</b>",
      });

      console.log(`Email sent to ${emailId}: ${info.messageId}`);
    } catch (error) {
      console.error(`Failed to send email to ${emailId}:`, error);
    }
  },
  {
    concurrency: 100,
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);