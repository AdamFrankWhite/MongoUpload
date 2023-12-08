import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { postcodes } from "./tmp/output.js";
dotenv.config();
// Replace the uri string with your MongoDB deployment's connection string.
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
async function run() {
    try {
        // Get the database and collection on which to run the operation
        const database = client.db("postcodesToLatLng");
        const collection = database.collection("postcodes");
        // Prevent additional documents from being inserted if one fails
        const options = { ordered: true };
        // Execute insert operation
        const result = await collection.insertMany(postcodes, options);

        // Print result
        console.log(`${result.insertedCount} documents were inserted`);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
