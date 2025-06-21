import Link from 'next/link'
import { LogIn } from 'lucide-react'

export default function SignInPromptDialog() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-md rounded-xl p-8 shadow-2xl text-center border border-gray-200 max-w-sm mx-auto">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Access All Posts
        </h2>
        <p className="text-gray-600 mb-6">
          Sign in to your ThoughtStream account to read all the amazing blogs from our community.
        </p>
        <Link
          href="/signin"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium text-lg inline-flex items-center justify-center"
        >
          Sign In
        </Link>
      </div>
    </div>
  )
} 