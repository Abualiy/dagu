// app/api/habbos/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params
  const body = await req.json()

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', process.env.STORYBLOK_MANAGEMENT_TOKEN!)

  const response = await fetch(`https://mapi.storyblok.com/v1/spaces/285378710485282/stories/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      story: {
        name: body.title,
        slug: body.slug,
        content: {
          component: 'habbo',
          title: body.title,
          content: body.content,
          author: body.author,
          excerpt: body.excerpt,
          likes: body.likes,
        },
      },
      publish: 1,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    console.error('🔥 Failed to update:', error)
    return NextResponse.json({ error: 'Failed to update Habbo', details: error }, { status: 500 })
  }

  const result = await response.json()
  return NextResponse.json(result.story)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  const headers = new Headers()
  headers.append('Authorization', process.env.STORYBLOK_MANAGEMENT_TOKEN!)

  const response = await fetch(`https://mapi.storyblok.com/v1/spaces/285378710485282/stories/${id}`, {
    method: 'DELETE',
    headers,
  })

  if (!response.ok) {
    const error = await response.json()
    console.error('🔥 Failed to delete:', error)
    return NextResponse.json({ error: 'Failed to delete Habbo', details: error }, { status: 500 })
  }

  return NextResponse.json({ message: 'Deleted successfully' })
}
