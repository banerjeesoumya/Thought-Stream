'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from './store'

interface UseAuthOptions {
  redirectTo?: string
  redirectIfFound?: boolean
}

export function useAuth({ redirectTo = '/signin', redirectIfFound = false }: UseAuthOptions = {}) {
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // Zustand's persist middleware rehydrates asynchronously.
    // This effect runs only on the client after the first render,
    // so we can safely set the hydration status to true.
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) {
      return // Don't redirect until the client-side hydration is complete.
    }

    if (redirectIfFound && isAuthenticated) {
      router.push(redirectTo)
    }

    if (!redirectIfFound && !isAuthenticated) {
      router.push(redirectTo)
    }
  }, [isAuthenticated, hydrated, redirectIfFound, redirectTo, router])

  return { isAuthenticated, isLoading: !hydrated, user: useAuthStore.getState().user }
} 