"use server"

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Type for products
export interface Product {
    id: number;
    name: string;
    category: string;
    image: string;
    price: string;
}

// Helper to get supabase client safely
const getSupabase = () => {
  if (!supabaseUrl) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is missing. Please check your .env.local file.")
  }
  if (!supabaseKey) {
    throw new Error("Supabase API Key is missing. Please check your .env.local file (ANON or SERVICE_ROLE).")
  }
  return createClient(supabaseUrl, supabaseKey)
}

function handleSupabaseError(error: any) {
  console.error("Supabase Operation Failed:", error)
  if (error && (error.message?.includes("fetch failed") || error.code === 'ENOTFOUND')) {
    return `Network Connection Issue: Could not reach Supabase at ${supabaseUrl}. Please verify the URL and that your internet connection is active.`
  }
  return error.message || "An unexpected database error occurred"
}

export async function getDatabaseStatus() {
  const isConfigured = supabaseUrl.length > 0 && supabaseKey.length > 0
  
  if (!isConfigured) return { isConfigured: false, tableExists: false, url: supabaseUrl }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    // Try a simple count query to verify connectivity and table existence
    const { error } = await supabase.from('products').select('*', { count: 'exact', head: true })
    
    if (error) {
      return { 
        isConfigured: true, 
        tableExists: error.code !== 'PGRST11' && error.code !== '42P01', 
        error: error.message,
        errorCode: error.code,
        url: supabaseUrl
      }
    }
    
    return { isConfigured: true, tableExists: true, url: supabaseUrl }
  } catch (e: any) {
    return { 
      isConfigured: true, 
      tableExists: false, 
      error: e.message || String(e),
      url: supabaseUrl
    }
  }
}

export async function checkAdminPassword(password: string) {
   const adminPass = process.env.ADMIN_PASSWORD || "TreeIndia2026!";
   return password === adminPass;
}

export async function fetchAllProducts() {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("products").select("*").order("name")
    
    if (error) throw error
    return { success: true, products: data || [] }
  } catch (error: any) {
    return { success: false, error: handleSupabaseError(error) }
  }
}

export async function addProduct(product: Omit<Product, "id">) {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("products").insert([product]).select()
    
    if (error) throw error
    return { success: true, product: data?.[0] }
  } catch (error: any) {
    return { success: false, error: handleSupabaseError(error) }
  }
}

export async function updateProduct(id: number | string, product: Partial<Product>) {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("products").update(product).eq("id", id).select()
    
    if (error) throw error
    return { success: true, product: data?.[0] }
  } catch (error: any) {
    return { success: false, error: handleSupabaseError(error) }
  }
}

export async function deleteProduct(id: number | string) {
  try {
    const supabase = getSupabase()
    const { error } = await supabase.from("products").delete().eq("id", id)
    
    if (error) throw error
    return { success: true }
  } catch (error: any) {
    return { success: false, error: handleSupabaseError(error) }
  }
}

export async function fetchAllInquiries() {
  try {
    const supabase = getSupabase()
    const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false })
    
    if (error) throw error
    return { success: true, inquiries: data || [] }
  } catch (error: any) {
    return { success: false, error: handleSupabaseError(error) }
  }
}

export async function updateInquiryStatus(id: string, status: string) {
  try {
    const supabase = getSupabase()
    const { error } = await supabase.from("inquiries").update({ status }).eq("id", id)
    
    if (error) throw error
    return { success: true }
  } catch (error: any) {
    return { success: false, error: handleSupabaseError(error) }
  }
}

export async function deleteInquiry(id: string) {
  try {
    const supabase = getSupabase()
    const { error } = await supabase.from("inquiries").delete().eq("id", id)
    
    if (error) throw error
    return { success: true }
  } catch (error: any) {
    return { success: false, error: handleSupabaseError(error) }
  }
}

export async function seedInitialProducts(products: { name: string, category: string, image: string }[]) {
   try {
     const supabase = getSupabase()
     
     // Safety: Check if table is empty
     const { count } = await supabase.from("products").select("*", { count: 'exact', head: true })
     if (count && count > 0) {
       return { success: false, error: "Database already has data. Clear it first." }
     }

     const formattedProducts = products.map(p => ({
        name: p.name,
        category: p.category,
        image: p.image,
        price: 'Export Grade'
     }));
     
     const { error } = await supabase.from("products").insert(formattedProducts);
     if (error) throw error;
     return { success: true };
   } catch (error: any) {
     return { success: false, error: handleSupabaseError(error) };
   }
}

export async function deleteAllProducts() {
  try {
    const supabase = getSupabase()
    const { error } = await supabase.from("products").delete().neq("id", 0)
    if (error) throw error
    return { success: true }
  } catch (error: any) {
    return { success: false, error: handleSupabaseError(error) }
  }
}
