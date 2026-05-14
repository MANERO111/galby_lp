"use server";

import nodemailer from "nodemailer";

export async function sendEmail(formData: {
  fullName: string;
  phoneNumber: string;
  address: string;
  city: string;
}) {
  try {
    // Configure the SMTP transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true", // true for port 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send the email
    const info = await transporter.sendMail({
      from: `"Landing Page" <${process.env.SMTP_USER}>`, // sender address
      to: "lpads@icosmetiquegroupe.ma", // recipient address
      subject: `New Lead: ${formData.fullName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #000; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Lead Details</h2>
          <p><strong>Full Name / الاسم الكامل:</strong> ${formData.fullName}</p>
          <p><strong>Phone Number / رقم الهاتف:</strong> ${formData.phoneNumber}</p>
          <p><strong>Address / العنوان:</strong> ${formData.address}</p>
          <p><strong>City / المدينة:</strong> ${formData.city}</p>
        </div>
      `,
    });

    console.log("Email sent: %s", info.messageId);
    return { success: true };
  } catch (error: any) {
    console.error("Nodemailer Error:", error);
    return { success: false, error: error.message || "Failed to send email via SMTP" };
  }
}
