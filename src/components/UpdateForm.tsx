'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

const UpdateForm = ({ post }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState(post.content.title)
    const [content, setContent] = useState(post.content.content)
    const [excerpt, setExcerpt] = useState(post.content.excerpt)
    const author = post.content.author

    // Fetch existing data

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const res = await fetch(`/api/posts/${post.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({title, content, excerpt, author }),
        })

        if (res.ok) {
            setLoading(false)
            toast.success('Habbo updated!')
            router.push('/')
        } else {
            setLoading(false)
            toast.error('Update failed')
        }
    }

    return (
        <div>
            <div className="space-y-6">
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full p-3 border rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Excerpt (short preview)"
                    className="w-full p-3 border rounded"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Full content"
                    className="w-full p-3 border rounded"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    onClick={handleSubmit}
                    className="bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 disabled:opacity-50"
                >
                    {loading ? 'Updating...' : 'Update Habbo'}
                </button>
            </div>

        </div>
    )
}

export default UpdateForm
