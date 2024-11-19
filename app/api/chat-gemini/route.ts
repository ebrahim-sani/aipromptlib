import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
  const { message } = await req.json();

  const result = await model.generateContent(message);
  const generatedText = result.response.text(); 

  console.log(generatedText);

  return new Response(generatedText, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
