'use client'
import { deleteHabbo } from '@/lib/api'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

const MyPost = ({ posts }) => {
    if (!posts || posts.length === 0) {
        return <p className="text-gray-500">You haven't posted any Habbos yet.</p>
    }

    const handleDelete = async (id: number) => {
        const confirm = window.confirm('Are you sure you want to delete this Habbo?')
        if (!confirm) return

        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            })

            if (!res.ok) throw new Error('Delete failed')

            toast.success('Habbo deleted successfully')
            window.location.reload();
            // setPosts(posts.filter(post => post.id !== id))
        } catch (err) {
            console.error(err)
            toast.error('Failed to delete')
        }
    }


    return (
        <div className='min-h-[45vh]'>
            <div className="space-y-4">
                {posts.map((post: any) => (
                    <div key={post.id} className="border p-4 rounded-md shadow-sm bg-white">
                        <h3 className="text-xl font-bold text-orange-800">{post.content.title}</h3>
                        <span className='text-sm '>📅 {post.published_at?.split("T")[0] ?? post.created_at.split("T")[0]}</span>
                        <p className="text-sm text-gray-500 my-2 ">{post.content.excerpt}</p>
                        <div className="flex gap-3">
                            <span>❤️ {post.likes}</span>
                            <span>💬 {post.comments}</span>
                        </div>
                        <div className="flex gap-4 mt-2">
                            <Link
                                href={`/update-post/${post.slug}`}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                            >
                                ✏️ Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(post.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                            >
                                ❌ Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default MyPost
