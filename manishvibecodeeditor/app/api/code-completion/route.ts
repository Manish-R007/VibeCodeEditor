import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prefix, suffix, language } = await req.json();

    const response = await fetch(
      "https://api.mistral.ai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "codestral-latest",
          temperature: 0.05,
          max_tokens: 150,
          messages: [
            {
              role: "system",
              content: `
You are a Copilot-style code completion engine.

RULES:
- Continue code from cursor only
- Match existing patterns
- NO placeholders
- NO console.log
- If Express routes exist, continue Express routes
- Output ONLY valid ${language} code
              `.trim(),
            },
            {
              role: "user",
              content: `
Code before cursor:
${prefix}

Code after cursor:
${suffix}

Continue code:
              `.trim(),
            },
          ],
        }),
      }
    );

    const data = await response.json();

    let completion =
      data?.choices?.[0]?.message?.content ?? "";

    completion = completion
      .replace(/^```[\w]*\n?/g, "")
      .replace(/\n?```$/g, "")
      .trim();

    return NextResponse.json({
      completion,
      suggestion: completion,
    });
  } catch (error) {
    console.error("Code completion error:", error);
    return NextResponse.json({ completion: "" }, { status: 500 });
  }
}
