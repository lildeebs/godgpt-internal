'use client'

import { useRouter } from 'next/navigation'
import { useCalendarStore } from './store'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const calendar = useCalendarStore((state) => state.calendar)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (calendar) {
      router.push('/calendar')
    }
  }, [calendar, router])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (calendar) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6 text-pink-600">
          🎄 Advent Calendar 🎄
        </h1>
        <p className="text-xl mb-8 text-gray-700">
          Create your personalized advent calendar
        </p>
        <button
          onClick={() => router.push('/setup')}
          className="px-8 py-4 bg-pink-500 text-white rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
        >
          Get Started
        </button>
      </div>
    </div>
  )
}
