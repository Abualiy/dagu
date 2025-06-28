// import { storyblokApi } from "@/lib/storyblok";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log("📥 Incoming request body:", body);

    const SPACE_ID = '285378710485282'

    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', process.env.STORYBLOK_MANAGEMENT_TOKEN!)

    const response = await fetch(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            story: {
                name: body.title,
                slug: body.slug,
                parent_id: '62554905981865',
                content: {
                    component: 'habbo', // ✅ Match your component name in Storyblok
                    title: body.title,
                    content: body.content,
                    author: body.author,
                    excerpt: body.excerpt,
                    likes: body.likes
                },
            },
            publish: 1,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        console.error('🔥 Storyblok error:', error);
        return NextResponse.json({ error: 'Failed to create post', details: error }, { status: 500 });
    }

    const result = await response.json();
    return NextResponse.json(result.story);
}



