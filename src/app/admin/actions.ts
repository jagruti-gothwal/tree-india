"use server"

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

export async function checkAdminPassword(password: string) {
   const adminPass = process.env.ADMIN_PASSWORD || "TreeIndia2026!";
   return password === adminPass;
}

export async function fetchAllProducts() {
   try {
     const { data: products, error } = await supabase.from("products").select("*").order("id", { ascending: false });
     if (error) throw error;
     return { success: true, products };
   } catch (error: any) {
     return { success: false, error: error.message };
   }
}

export async function addProduct(name: string, category: string, image: string, price: string) {
   try {
     const { error } = await supabase.from("products").insert([{ name, category, image, price }]);
     if (error) throw error;
     return { success: true };
   } catch (error: any) {
     return { success: false, error: error.message };
   }
}

export async function updateProduct(id: number, name: string, category: string, image: string, price: string) {
   try {
     const { error } = await supabase.from("products").update({ name, category, image, price }).eq("id", id);
     if (error) throw error;
     return { success: true };
   } catch (error: any) {
     return { success: false, error: error.message };
   }
}

export async function deleteProduct(id: number) {
   try {
     const { error } = await supabase.from("products").delete().eq("id", id);
     if (error) throw error;
     return { success: true };
   } catch (error: any) {
     return { success: false, error: error.message };
   }
}

export async function seedInitialProducts(products: { name: string, category: string, image: string }[]) {
   try {
     const formattedProducts = products.map(p => ({
        name: p.name,
        category: p.category,
        image: p.image,
        price: 'Export Grade'
     }));
     // Bulk insert support in Supabase
     const { error } = await supabase.from("products").insert(formattedProducts);
     if (error) throw error;
     return { success: true };
   } catch (error: any) {
     return { success: false, error: error.message };
   }
}
