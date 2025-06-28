import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { content } = await req.json()

  if (!content) {
    return NextResponse.json({ error: 'No content provided' }, { status: 400 })
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct', // ✅ Changed model
        messages: [
          {
            role: 'system',
            content: 'Summarize the following blog post into 2–3 short and engaging sentences for a preview excerpt.'
          },
          {
            role: 'user',
            content
          }
        ],
        max_tokens: 100,
        temperature: 0.7,
      })
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('OpenRouter error:', data)
      return NextResponse.json({ error: 'AI generation failed', details: data }, { status: 500 })
    }

    const excerpt = data.choices?.[0]?.message?.content || 'No excerpt generated.'
    return NextResponse.json({ excerpt })

  } catch (err) {
    console.error('Excerpt generation error:', err)
    return NextResponse.json({ error: 'AI generation failed' }, { status: 500 })
  }
}
