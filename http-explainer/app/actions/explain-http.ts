"use server"

import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function explainHttpMessage(httpMessage: string, mode: "request" | "response" | "both"): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured")
  }

  const systemMessage = `You are an infosec assistant. Given an HTTP request/response, output a clear, non-jargon explanation of each component, identify methods, paths, status codes, headers, cookies, query/body parameters and clarify their purpose in bullet-points. Mention potential security implications briefly.

Format your response with clear sections using markdown headers:
## Overall Summary
## Headers
## Cookies (if present)
## Body (if present)
## Security Implications

Be concise but thorough, and explain technical terms in plain language.`

  const userMessage = `Please analyze this HTTP ${mode}:\n\n${httpMessage}`

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemMessage,
      prompt: userMessage,
      maxTokens: 2000,
    })

    return text
  } catch (error) {
    console.error("OpenAI API error:", error)
    throw new Error("Failed to analyze HTTP message")
  }
}
