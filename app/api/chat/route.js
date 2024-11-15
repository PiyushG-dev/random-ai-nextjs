import axios from "axios";

const API_URL =
  "https://api-inference.huggingface.co/models/microsoft/DialoGPT-small";
const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;
export async function POST(req) {
  const { message } = await req.json();

  try {
    const response = await axios.post(
      API_URL,
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    const botResponse = response.data[0]?.generated_text;
    return new Response(
      JSON.stringify({ response: botResponse }, { status: 200 })
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch response" }, { status: 500 })
    );
  }
}
