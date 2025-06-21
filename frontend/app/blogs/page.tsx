'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { blogAPI } from '@/lib/api'
import { Blog } from '@/lib/types'
import { formatDate, truncateText } from '@/lib/utils'
import { useAuthStore } from '@/lib/store'
import SignInPromptDialog from '@/components/SignInPromptDialog'
import BlogCardSkeleton from '@/components/BlogCardSkeleton'
import { Loader2, Calendar, User, ArrowRight } from 'lucide-react'

export default function BlogsPage() {
  const { isAuthenticated } = useAuthStore()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Only fetch blogs if the user is authenticated.
    if (!isAuthenticated) {
      setIsLoading(false)
      return
    }

    const fetchBlogs = async () => {
      try {
        const data = await blogAPI.getAll()
        const sortedData = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setBlogs(sortedData)
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch blogs')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [isAuthenticated])

  const LoggedOutView = () => (
    <div className="relative">
      <div className="absolute inset-0 bg-white/30 backdrop-filter backdrop-blur-sm z-10" />
      <SignInPromptDialog />
      <div className="blur-md pointer-events-none">
        <PageHeader />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
  
  const PageHeader = () => (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Discover Amazing Thoughts
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Explore insights, stories, and perspectives from our community of writers
      </p>
    </div>
  )

  if (!isAuthenticated) {
    return <LoggedOutView />
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading blogs...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md">
            <p className="font-medium">Error loading blogs</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader />

      {blogs.length === 0 ? (
        <div className="text-center py-20">
          <div className="bg-gray-50 rounded-xl p-12 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No blogs yet
            </h3>
            <p className="text-gray-600 mb-6">
              Be the first to share your thoughts with the community!
            </p>
            <Link
              href="/create"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
            >
              Write Your First Blog
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 card-hover"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {truncateText(blog.content, 120)}
                </p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{blog.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/blog/${blog.id}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Read more
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  )
} 