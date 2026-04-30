const { MongoClient } = require('mongodb');

async function findReplicaSet() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const admin = client.db('admin');
    const status = await admin.command({ replSetGetStatus: 1 });
    console.log("Replica Set Name:", status.set);
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await client.close();
  }
}

findReplicaSet();
