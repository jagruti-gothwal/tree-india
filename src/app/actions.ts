"use server"

import { createClient } from "@supabase/supabase-js"

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

  const { error } = await supabase.from("inquiries").insert([data])

  if (error) {
    console.error("Database insert failed:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
