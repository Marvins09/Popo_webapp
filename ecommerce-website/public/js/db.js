const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db('ecommerce');
    return db;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

module.exports = connect;