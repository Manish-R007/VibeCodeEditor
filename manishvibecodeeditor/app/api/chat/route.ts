import { type NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  history: ChatMessage[];
  model: string;
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

  const fullMessages = [
    { role: "system", content: systemPrompt },
    ...messages,
  ];

  const prompt = fullMessages
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n\n");

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
        model: model,
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("AI API Error:", errorData);
      throw new Error(`AI API Error: ${response.statusText}`);
    }

    const data = await response.json();

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

    // Validate request
    if (!message || !history || !model) {
      return NextResponse.json(
        { error: "Invalid request: missing message, history, or model" },
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
    const aiResponse = await generateAiResponse(messages, model);

    return NextResponse.json({
      response: aiResponse,
      model: model,
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