"use server"

import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

// Type for products
export interface Product {
    id: string; // Changed from number to string for MongoDB ObjectId
    name: string;
    category: string;
    image: string;
    price: string;
}

function handleMongoError(error: any) {
  console.error("MongoDB Operation Failed:", error)
  if (error && error.message?.includes("connection")) {
    return `Network Connection Issue: Could not reach MongoDB. Please verify your connection string in .env.local.`
  }
  return error.message || "An unexpected database error occurred"
}

export async function getDatabaseStatus() {
  const uri = process.env.MONGODB_URI || "";
  const isConfigured = uri.length > 0 && !uri.includes("<username>");
  
  if (!isConfigured) return { isConfigured: false, tableExists: false, url: "MongoDB Atlas" }
  
  try {
    const db = await getDb()
    // Try a simple command to verify connectivity
    await db.command({ ping: 1 })
    
    // Check if collections exist
    const collections = await db.listCollections().toArray()
    const productsExist = collections.some(c => c.name === 'products')
    
    return { isConfigured: true, tableExists: productsExist, url: "MongoDB Atlas" }
  } catch (e: any) {
    return { 
      isConfigured: true, 
      tableExists: false, 
      error: e.message || String(e),
      url: "MongoDB Atlas"
    }
  }
}

export async function checkAdminPassword(password: string) {
   const adminPass = process.env.ADMIN_PASSWORD || "TreeIndia2026!";
   return password === adminPass;
}

export async function fetchAllProducts() {
  try {
    const db = await getDb()
    const products = await db.collection("products").find({}).sort({ name: 1 }).toArray()
    
    const formattedProducts = products.map(p => ({
      ...p,
      id: p._id.toString(),
      _id: undefined
    })) as unknown as Product[]

    return { success: true, products: formattedProducts }
  } catch (error: any) {
    return { success: false, error: handleMongoError(error) }
  }
}

export async function addProduct(product: Omit<Product, "id">) {
  try {
    const db = await getDb()
    const result = await db.collection("products").insertOne(product)
    
    return { 
      success: true, 
      product: { ...product, id: result.insertedId.toString() } as Product 
    }
  } catch (error: any) {
    return { success: false, error: handleMongoError(error) }
  }
}

export async function updateProduct(id: string, product: Partial<Product>) {
  try {
    const db = await getDb()
    const { id: _, ...updateData } = product as any;
    const result = await db.collection("products").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    )
    
    if (!result) throw new Error("Product not found")
    
    return { 
      success: true, 
      product: { ...result, id: result._id.toString(), _id: undefined } as unknown as Product 
    }
  } catch (error: any) {
    return { success: false, error: handleMongoError(error) }
  }
}

export async function deleteProduct(id: string) {
  try {
    const db = await getDb()
    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) })
    
    if (result.deletedCount === 0) throw new Error("Product not found")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: handleMongoError(error) }
  }
}

export async function fetchAllInquiries() {
  try {
    const db = await getDb()
    const inquiries = await db.collection("inquiries").find({}).sort({ created_at: -1 }).toArray()
    
    const formattedInquiries = inquiries.map(i => ({
      ...i,
      id: i._id.toString(),
      _id: undefined
    }))

    return { success: true, inquiries: formattedInquiries }
  } catch (error: any) {
    return { success: false, error: handleMongoError(error) }
  }
}

export async function updateInquiryStatus(id: string, status: string) {
  try {
    const db = await getDb()
    await db.collection("inquiries").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    )
    return { success: true }
  } catch (error: any) {
    return { success: false, error: handleMongoError(error) }
  }
}

export async function deleteInquiry(id: string) {
  try {
    const db = await getDb()
    await db.collection("inquiries").deleteOne({ _id: new ObjectId(id) })
    return { success: true }
  } catch (error: any) {
    return { success: false, error: handleMongoError(error) }
  }
}

export async function seedInitialProducts(products: { name: string, category: string, image: string }[]) {
   try {
     const db = await getDb()
     
     // Safety: Check if table is empty
     const count = await db.collection("products").countDocuments()
     if (count > 0) {
       return { success: false, error: "Database already has data. Clear it first." }
     }

     const formattedProducts = products.map(p => ({
        name: p.name,
        category: p.category,
        image: p.image,
        price: 'Export Grade',
        created_at: new Date()
     }));
     
     await db.collection("products").insertMany(formattedProducts)
     return { success: true };
   } catch (error: any) {
     return { success: false, error: handleMongoError(error) };
   }
}

export async function deleteAllProducts() {
  try {
    const db = await getDb()
    await db.collection("products").deleteMany({})
    return { success: true }
  } catch (error: any) {
    return { success: false, error: handleMongoError(error) }
  }
}
