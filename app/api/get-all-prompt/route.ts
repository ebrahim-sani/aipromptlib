import clientPromise from "../../../lib/mongodb";
// @ts-ignore
import { Db, Collection } from "mongodb";

type Prompt = {
  _id?: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
};

export async function GET(req: Request) {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const client = await clientPromise;
    const db: Db = client.db("aipromptlib");
    
    const collection: Collection<Prompt> = db.collection("prompts");
    const data = await collection.find({}).toArray();


    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error -->:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
