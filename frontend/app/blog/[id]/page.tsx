'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { blogAPI } from '@/lib/api'
import { Blog } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import { Loader2, Calendar, User, ArrowLeft, Edit } from 'lucide-react'
import { useAuthStore } from '@/lib/store'

export default function BlogPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogId = Number(params.id)
        if (isNaN(blogId)) {
          setError('Invalid blog ID')
          setIsLoading(false)
          return
        }

        const data = await blogAPI.getById(blogId)
        setBlog(data)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch blog')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlog()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading blog...</p>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md">
            <p className="font-medium">Error loading blog</p>
            <p className="text-sm mt-1">{error || 'Blog not found'}</p>
            <Link
              href="/blogs"
              className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Back to blogs
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const isAuthor = isAuthenticated && user?.name === blog.author.name

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/blogs"
          className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to blogs
        </Link>
      </div>

      {/* Blog Content */}
      <article className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-8 shadow-lg">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {blog.title}
          </h1>
          
          <div className="flex items-center justify-between text-gray-600 mb-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{blog.author.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
            </div>
            
            {isAuthor && (
              <Link
                href={`/blog/${blog.id}/edit`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Link>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Written by {blog.author.name}
            </div>
            <Link
              href="/blogs"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View all blogs
            </Link>
          </div>
        </footer>
      </article>
    </div>
  )
} 