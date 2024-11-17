const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const uri = "mongodb://localhost:27017/whitesoft"; // Replace with your MongoDB URI if different
const client = new MongoClient(uri);

async function addAdmin() {
  try {
    // Connect to MongoDB
    await client.connect();
    const db = client.db("whitesoft"); // Replace with your database name
    const collection = db.collection("admins"); // Replace with your collection name

    // Admin details
    const adminDetails = {
      username: "suraj1",
      password:"12345678",
    };

    // Hash the password
    // const plainPassword = "123456"; // Replace with the actual password
    // const saltRounds = 10;
    // adminDetails.password = await bcrypt.hash(plainPassword, saltRounds);

    // Insert the admin details into the collection
    const result = await collection.insertOne(adminDetails);
    console.log("Admin added successfully with ID:", result.insertedId);
  } catch (error) {
    console.error("Error adding admin:", error);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

addAdmin();
