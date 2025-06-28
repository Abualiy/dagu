'use client'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

const HabboView = ({ post }) => {
    const [likes, setLikes] = useState(post.content.likes?.split(", ").length || 0)
    const [comments, setComments] = useState([
        { author: 'Ahmed Nur', text: 'Very helpful info. Thanks!' },
        { author: 'Ayan Ali', text: 'Dagu going digital is amazing!' },
    ])
    const [newComment, setNewComment] = useState('')

    const handleLike = () => {
        setLikes((prev) => prev + 1)
    }

    const handleSubmitComment = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newComment.trim()) return
        setComments([{ author: 'You', text: newComment }, ...comments])
        setNewComment('')
    }
    return (
        <div>
            <div className="max-w-3xl mx-auto px-4 py-10">

                <h1 className="text-4xl font-bold text-orange-800">{post.content.title}</h1>
                <div className="text-sm text-gray-500 mt-1">
                    By <span className="font-semibold">{post.content.author}</span> •{' '}
                    {post.published_at?.split("T")[0] ?? post.created_at.split("T")[0]}
                </div>

                <ReactMarkdown>
                    {post.content.content}
                </ReactMarkdown>

                {/* Like Button */}
                <div className="flex items-center gap-3 mt-6">
                    <button
                        onClick={handleLike}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1 rounded"
                    >
                        ❤️ Like
                    </button>
                    <span className="text-gray-600">{likes} likes</span>
                </div>

                {/* Comments Section */}
                <div className="mt-10">
                    <h2 className="text-2xl font-bold text-[#974900] mb-4">Comments</h2>

                    {/* Comment Form */}
                    <form onSubmit={handleSubmitComment} className="mb-6">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full border rounded p-3 resize-none"
                            rows={3}
                            placeholder="Write your comment..."
                        />
                        <button
                            type="submit"
                            className="mt-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                        >
                            Submit
                        </button>
                    </form>

                    {/* Existing Comments */}
                    {comments.length === 0 ? (
                        <p className="text-gray-500">No comments yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {comments.map((c, i) => (
                                <li key={i} className="bg-orange-50 p-4 rounded shadow-sm">
                                    <p className="text-sm text-gray-800">{c.text}</p>
                                    <span className="text-xs text-gray-500">– {c.author}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HabboView
