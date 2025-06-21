'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/lib/useAuth'
import { useAuthStore } from '@/lib/store'
import { Loader2, User, Mail, Edit, LogOut } from 'lucide-react'

export default function ProfilePage() {
  const { user, isLoading: isAuthLoading } = useAuth()
  const router = useRouter()
  const { logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Profile
        </h1>
        <p className="text-xl text-gray-600">
          Manage your account and view your information
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">ThoughtStream Member</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <Mail className="w-5 h-5 text-gray-500" />
                <span>{user?.email}</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="md:col-span-2">
          <div className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Quick Actions
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/create"
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Edit className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Write a Blog</h4>
                  <p className="text-sm text-gray-600">Share your thoughts with the community</p>
                </div>
              </Link>

              <Link
                href="/blogs"
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">View All Blogs</h4>
                  <p className="text-sm text-gray-600">Discover amazing content from others</p>
                </div>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Account Information</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Member since:</span>
                  <span className="text-gray-900">Today</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account status:</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 