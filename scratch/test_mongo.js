const { MongoClient } = require('mongodb');

async function test() {
  const uri = process.env.MONGODB_URI;
  console.log("Testing connection to:", uri.split('@')[1]); // Hide credentials
  
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB!");
    const db = client.db(process.env.MONGODB_DB);
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
  } catch (err) {
    console.error("Connection failed:", err.message);
  } finally {
    await client.close();
  }
}

test();
