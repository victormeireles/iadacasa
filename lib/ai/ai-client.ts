/**
 * AI Client — abstraction layer for future AI provider integration.
 *
 * Currently returns mock responses. Replace the implementation of each
 * function when AI_PROVIDER and AI_API_KEY are configured.
 *
 * Supported future providers: Anthropic (Claude), OpenAI, etc.
 */

export type AIProvider = 'anthropic' | 'openai' | 'mock'

export interface AIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface AICompletionOptions {
  model?: string
  maxTokens?: number
  temperature?: number
}

export async function aiComplete(messages: AIMessage[]): Promise<string> {
  const provider = (process.env.AI_PROVIDER ?? 'mock') as AIProvider

  if (provider === 'mock' || !process.env.AI_API_KEY) {
    // Return the last user message echoed — actual mock logic lives in callers
    return `[mock] ${messages[messages.length - 1]?.content?.slice(0, 100)}…`
  }

  if (provider === 'anthropic') {
    // TODO: implement Anthropic Claude call
    // const Anthropic = (await import('@anthropic-ai/sdk')).default
    // const client = new Anthropic({ apiKey: process.env.AI_API_KEY })
    // const response = await client.messages.create({ ... })
    throw new Error('Anthropic integration not yet implemented')
  }

  if (provider === 'openai') {
    // TODO: implement OpenAI call
    throw new Error('OpenAI integration not yet implemented')
  }

  throw new Error(`Unknown AI provider: ${provider}`)
}

export function isAIConfigured(): boolean {
  return !!(process.env.AI_PROVIDER && process.env.AI_API_KEY && process.env.AI_PROVIDER !== 'mock')
}
