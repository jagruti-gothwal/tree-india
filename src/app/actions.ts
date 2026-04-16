"use server"

import { createClient } from "@supabase/supabase-js"
import nodemailer from "nodemailer"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
// Fallback to the publishable key they provided if standard ANON_KEY is missing
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || ""

const supabase = createClient(supabaseUrl, supabaseKey)

export async function submitInquiry(formData: FormData) {
  const name = formData.get("name")?.toString() || ""
  const email = formData.get("email")?.toString() || ""
  const phone = formData.get("phone")?.toString() || ""
  const message = formData.get("message")?.toString() || ""
  const product_ids = formData.get("product_ids")?.toString() || ""

  const data = {
    name,
    email,
    phone,
    message,
    product_ids,
  }

  // 1. Save to Database
  const { error } = await supabase.from("inquiries").insert([data])

  if (error) {
    console.error("Database insert failed:", error)
    return { success: false, error: error.message }
  }

  // 2. Send Email Notification
  try {
    // Note: You must add EMAIL_USER and EMAIL_PASS to your .env.local
    // For Yahoo, you need to generate an "App Password" in your account security settings.
    const transporter = nodemailer.createTransport({
      service: "yahoo",
      auth: {
        user: process.env.EMAIL_USER || "tree.india@yahoo.com",
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: `"Tree India Website" <${process.env.EMAIL_USER || "tree.india@yahoo.com"}>`,
      to: "tree.india@yahoo.com",
      subject: `New B2B Inquiry: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #014995;">New Website Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Product IDs:</strong> ${product_ids}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${message}
          </div>
          <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #888;">This email was sent from the Tree India B2B Inquiry Form.</p>
        </div>
      `,
    }

    if (process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions)
    } else {
      console.warn("Email not sent: EMAIL_PASS environment variable is missing.")
    }
  } catch (emailError) {
    console.error("Email notification failed:", emailError)
  }

  return { success: true }
}
