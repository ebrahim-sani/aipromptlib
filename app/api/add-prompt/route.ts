import clientPromise from "../../../lib/mongodb";
//@ts-ignore
import { Db, Collection } from "mongodb";

type Prompt = {
  _id?: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
};

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response("", {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  const bodyObject: Prompt = await req.json();
  const client = await clientPromise;

  const db: Db = client.db("aipromptlib");
  const collection: Collection<Prompt> = db.collection("prompts");

  const newPrompt = await collection.insertOne(bodyObject);

  console.log(newPrompt);

  return new Response(newPrompt, {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
