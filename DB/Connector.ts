import { MongoClient } from "mongodb";

const uri: string = process.env.MONGODB_URI || "";

let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (!client) {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
