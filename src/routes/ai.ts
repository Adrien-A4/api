import { Router } from "express";
import { Client } from "@gradio/client";
import { OpenAI } from "openai";

const router = Router();
const SAMBANOVA_API_URL = "https://api.sambanova.ai/v1/chat/completions";
const SAMBANOVA_API_KEY = process.env.SAMBANOVA_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const groqClient = new OpenAI({
  apiKey: GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

let gradioClient: any = null;
const getGradioClient = async () => {
  if (!gradioClient) {
    gradioClient = await Client.connect("Mohx3ed/adrienAi");
  }
  return gradioClient;
};

async function trySambaNova(prompt: string) {
  console.log("Attempting SambaNova...");
  try {
    const response = await fetch(SAMBANOVA_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SAMBANOVA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "Meta-Llama-3.3-70B-Instruct",
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const json: any = await response.json();
    if (json.error) throw new Error(json.error.message || "SambaNova Error");
    return json.choices?.[0]?.message?.content || null;
  } catch (e) {
    console.error("SambaNova failed:", e);
    return null;
  }
}

async function tryGroq(prompt: string) {
  console.log("Attempting Groq...");
  try {
    const response = await groqClient.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0]?.message?.content || null;
  } catch (e) {
    console.error("Groq failed:", e);
    return null;
  }
}

async function tryGradio(prompt: string) {
  console.log("Attempting Gradio (Last Resort)...");
  try {
    const client = await getGradioClient();
    const result: any = await client.predict("/chat_fn", {
      message: prompt,
    });
    return result?.data?.[0] || result?.data || result?.toString() || null;
  } catch (e) {
    console.error("Gradio failed:", e);
    return null;
  }
}

async function unifiedChat(prompt: string) {
  let result = await trySambaNova(prompt);
  if (result) return result;

  result = await tryGroq(prompt);
  if (result) return result;

  result = await tryGradio(prompt);
  return result || "All AI providers failed. Please try again later.";
}

router.post("/chat", async (req, res) => {
  const { message, messages, prompt: bodyPrompt } = req.body;
  const prompt =
    message ||
    bodyPrompt ||
    (Array.isArray(messages) ? messages[messages.length - 1]?.content : null);

  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided." });
  }

  const result = await unifiedChat(prompt);
  res.json({ result });
});

router.post("/generate-text", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "prompt is required" });
  const result = await unifiedChat(prompt);
  res.json({ result });
});

router.post("/generate-code", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "prompt is required" });
  const fullPrompt = `You are an expert coding assistant. Output only code unless explanation is requested.\n\n${prompt}`;
  const result = await unifiedChat(fullPrompt);
  res.json({ result });
});

export default router;
