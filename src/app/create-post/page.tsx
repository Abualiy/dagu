'use client'

import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import { useUser } from '@/lib/useUser'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'sonner'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [createLoading, setCreateLoading] = useState(false)
  const [generatingExcerpt, setGeneratingExcerpt] = useState(false)
  const { user, loading } = useUser()

  const slugify = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
  }

  const slug = slugify(title)

  const generateExcerpt = async () => {
    if (!content.trim()) {
      toast('Please enter content before generating an excerpt.')
      return
    }

    try {
      setGeneratingExcerpt(true)
      const res = await fetch('/api/ai/excerpt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })
      const data = await res.json()
      if (res.ok) {
        setExcerpt(data.excerpt)
        toast('Excerpt generated successfully!')
      } else {
        toast.error('AI generation failed')
        console.log(data)
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong with AI.')
    } finally {
      setGeneratingExcerpt(false)
    }
  }

  const submit = async (e: any) => {
    e.preventDefault()
    setCreateLoading(true)

    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        slug,
        content,
        excerpt,
        likes: '',
        author: user.name,
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      toast('Post created successfully!')
      setTitle('')
      setExcerpt('')
      setContent('')
    } else {
      toast.error('Post creation failed!')
    }
    setCreateLoading(false)
  }

  if (loading) {
    return (
      <div className="w-screen h-screen overflow-hidden flex items-center justify-center">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="w-screen h-screen overflow-hidden flex items-center justify-center">
        <h1 className="text-3xl font-bold">Please login to create habbos!</h1>
        <Link href="/" className="text-blue-500 underline cursor-pointer">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Nav />
      <div className="max-w-2xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-orange-700 mb-6">📬 Create a New Habbo</h1>

        <form onSubmit={submit} className="space-y-6">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-3 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="flex flex-col gap-2 items-start border ">
            <textarea
              placeholder="Excerpt (short preview)"
              className="w-full p-3 border-none"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
            />
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer ml-3 mb-3"
              disabled={generatingExcerpt}
              onClick={generateExcerpt}
            >
              {generatingExcerpt ? 'Thinking...' : '✨ AI Excerpt'}
            </button>
          </div>
          
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
            disabled={createLoading}
            className="bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 disabled:opacity-50"
          >
            {createLoading ? 'Submitting...' : 'Create Habbo'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default CreatePost
