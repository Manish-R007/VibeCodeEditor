import { type NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  history: ChatMessage[];
  model: string;
}

const DEFAULT_CHAT_MODEL = "gpt-oss-120b";

const supportedChatModels = new Set([
  "gpt-oss-120b",
  "zai-glm-4.7",
  "llama3.1-8b",
  "llama-3.3-70b",
  "llama-4-scout-17b-16e-instruct",
  "qwen-3-32b",
  "qwen-3-235b-a22b-instruct-2507",
]);

function normalizeChatModel(model?: string) {
  if (model && supportedChatModels.has(model)) {
    return model;
  }

  return DEFAULT_CHAT_MODEL;
}

async function generateAiResponse(
  messages: ChatMessage[],
  model: string
): Promise<string> {
  const systemPrompt = `
You are a helpful AI assistant for developers. You help with:
1. Debugging code
2. Solving problems
3. Explaining concepts
4. Writing code
5. Writing documentation
6. Writing tests
7. Troubleshooting issues

Always provide clear, practical answers. Use proper code formatting when showing examples.
`;

  const fullMessages: AIMessage[] = [
    { role: "system", content: systemPrompt },
    ...messages,
  ];

  try {
    // Replace with your actual AI API endpoint
    const apiUrl = process.env.AI_API_URL || "https://api.cerebras.ai/v1/chat/completions";
    const apiKey = process.env.CEREBRAS_API_KEY;

    if (!apiKey) {
      throw new Error("CEREBRAS_API_KEY is not set");
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: fullMessages,
        temperature: 0.7,
        max_completion_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData: unknown = errorText;

      try {
        errorData = JSON.parse(errorText);
      } catch {
        // Keep the raw text when the provider does not return JSON.
      }

      console.error("AI API Error:", errorData);
      throw new Error(`AI API Error (${response.status}): ${response.statusText}`);
    }

    const data = await response.json() as {
      choices?: Array<{ message?: { content?: string } }>;
      response?: string;
      text?: string;
    };

    // Handle different response formats
    const content =
      data.choices?.[0]?.message?.content ||
      data.response ||
      data.text;

    if (!content) {
      throw new Error("No response content from AI service");
    }

    return content.trim();
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message, history, model } = body;
    const chatModel = normalizeChatModel(model);

    // Validate request
    if (!message || !history) {
      return NextResponse.json(
        { error: "Invalid request: missing message or history" },
        { status: 400 }
      );
    }

    // Validate and filter history
    const validateHistory = Array.isArray(history)
      ? history.filter(
          (h) =>
            h &&
            typeof h === "object" &&
            typeof h.role === "string" &&
            typeof h.content === "string" &&
            ["user", "assistant"].includes(h.role.toLowerCase())
        )
      : [];

    const recentHistory = validateHistory.slice(-10);

    const messages: ChatMessage[] = [
      ...recentHistory,
      { role: "user", content: message },
    ];

    // Generate AI response
    const aiResponse = await generateAiResponse(messages, chatModel);

    return NextResponse.json({
      response: aiResponse,
      model: chatModel,
      tokens: aiResponse.split(" ").length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
