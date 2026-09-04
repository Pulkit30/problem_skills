import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

const dbName = 'userDatabase';
const collectionName = 'users';

// Raw user data from your request
const userData = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496"
    }
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets"
  }
};

async function run() {
  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully!');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // 1. Prepare data for MongoDB
    // MongoDB uses `_id` as the primary key. We map `id` to `_id`.
    // We also convert coordinates to numbers for geo queries/calculations.
    const documentToInsert = {
      _id: userData.id,
      name: userData.name,
      username: userData.username,
      email: userData.email,
      address: {
        ...userData.address,
        geo: {
          lat: parseFloat(userData.address.geo.lat),
          lng: parseFloat(userData.address.geo.lng)
        }
      },
      phone: userData.phone,
      website: userData.website,
      company: userData.company
    };

    console.log('\nInserting/Updating user data...');
    
    // Using updateOne with upsert: true ensures that:
    // - If the user doesn't exist, they are inserted.
    // - If they exist, they are updated with the latest data.
    // This avoids "Duplicate Key" errors on multiple runs.
    const result = await collection.updateOne(
      { _id: documentToInsert._id },
      { $set: documentToInsert },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      console.log(`Successfully inserted new user with _id: ${result.upsertedId._id}`);
    } else if (result.modifiedCount > 0) {
      console.log(`User with _id: ${documentToInsert._id} already existed. Updated successfully.`);
    } else {
      console.log(`User with _id: ${documentToInsert._id} already up to date.`);
    }

    // 2. Fetch the document to verify it was stored correctly
    console.log('\nFetching user data...');
    const user = await collection.findOne({ _id: documentToInsert._id });
    console.log('User found in database:', JSON.stringify(user, null, 2));

  } catch (error) {
    console.error('Error executing database operations:', error);
  } finally {
    // Ensure client connection is closed
    await client.close();
    console.log('\nDatabase connection closed.');
  }
}

run();
