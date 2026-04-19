"use server"

import { createClient } from "@supabase/supabase-js"
import nodemailer from "nodemailer"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || ""

// Helper to get supabase client safely
const getSupabase = () => {
  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase credentials missing. Database operations will fail.")
    return null
  }
  return createClient(supabaseUrl, supabaseKey)
}

const supabase = getSupabase()

export async function submitInquiry(formData: FormData): Promise<{ success: boolean; error?: string }> {
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

  let dbSuccess = false;
  let emailSuccess = false;
  let lastError = "";

  // 1. Save to Database
  if (!supabase) {
    console.error("Database submission skipped: Supabase client not initialized.")
    lastError = "Database configuration missing";
  } else {
    try {
      const { error } = await supabase.from("inquiries").insert([data])
      if (error) {
        console.error("Database insert failed:", error)
        lastError = error.message;
      } else {
        dbSuccess = true;
      }
    } catch (dbError: any) {
      console.error("Supabase Connection Crash:", dbError.message)
      lastError = dbError.message;
    }
  }

  // 2. Send Email Notification
  try {
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
      emailSuccess = true;
    } else {
      console.warn("Email not sent: EMAIL_PASS environment variable is missing.")
      lastError = lastError || "Email configuration missing";
    }
  } catch (emailError: any) {
    console.error("Email notification failed:", emailError)
    lastError = emailError.message || "Email delivery failed";
  }

  // We consider it a partial success if at least one method worked
  if (dbSuccess || emailSuccess) {
    return { success: true }
  }

  return { 
    success: false, 
    error: lastError || "Failed to process inquiry through all available channels" 
  }
}
