import Link from 'next/link'
import React from 'react'

const HabboCard = ({ posts }) => {

    console.log(posts)
    return (
        <div className="p-6 flex flex-col items-center gap-10 mb-10">
            {posts.map((post) => (
                <div key={post.id} className="bg-white w-[95%] md:w-[80%] lg:w-[60%] rounded-xl shadow hover:shadow-lg transition p-5">
                    <h2 className="text-xl font-bold text-orange-800 mb-2">{post.content.title}</h2>
                    <div className="flex flex-col items-start text-sm text-gray-500 mb-2">
                        <span>👤 {post.content.author}</span>
                        <span>📅 {post.published_at?.split("T")[0] ?? post.created_at.split("T")[0]} </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{post.content.excerpt}</p>
                    <div className="flex justify-between mt-4">
                        <Link href={'/habbos/' + post.slug} className="text-orange-600 hover:underline">Read More</Link>
                        <div className="flex gap-3">
                            <span>❤️ 4</span>
                            <span>💬 3</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default HabboCard
