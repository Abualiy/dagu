import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { content } = await req.json()

  if (!content) {
    return NextResponse.json({ error: 'No content provided' }, { status: 400 })
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY!}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-distill-qwen-7b',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful writing assistant. When given a blog post, improve its clarity, tone, and grammar, and return only the improved version.',
          },
          {
            role: 'user',
            content: `Improve the following blog content:\n\n${content}`,
          },
        ],
        max_tokens: 1000,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('AI error:', result)
      return NextResponse.json({ error: 'AI generation failed', details: result }, { status: 500 })
    }

    const improved = result.choices?.[0]?.message?.content
    return NextResponse.json({ improved })
  } catch (err) {
    console.error('Improve error:', err)
    return NextResponse.json({ error: 'AI generation failed' }, { status: 500 })
  }
}
