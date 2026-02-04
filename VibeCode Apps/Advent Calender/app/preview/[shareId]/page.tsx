'use client'

import { useRouter, useParams } from 'next/navigation'
import { useCalendarStore } from '../../store'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
// Using simple icons instead of lucide-react for now

export default function PreviewPage() {
  const router = useRouter()
  const params = useParams()
  const shareId = params?.shareId as string
  const calendar = useCalendarStore((state) => state.calendar)
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // In a real app, you'd fetch the calendar by shareId from a backend
    // For now, we'll use the current calendar if shareId matches
    if (!calendar || calendar.shareId !== shareId) {
      // In production, fetch from backend using shareId
      router.push('/setup')
    }
  }, [calendar, shareId, router])

  if (!mounted || !calendar) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/calendar/${shareId}`
    : ''

  const handleCopy = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: `linear-gradient(135deg, ${calendar.palette.colors[3]} 0%, ${calendar.palette.colors[2]} 100%)`,
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg font-handwritten"
            style={{ 
              color: calendar.palette.colors[0],
              textShadow: '2px 2px 4px rgba(0,0,0,0.2), 0 0 8px rgba(0,0,0,0.1)',
            }}
          >
            {calendar.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-semibold mb-6 font-handwritten"
            style={{ 
              color: calendar.palette.colors[1] || '#333333',
            }}
          >
            Your calendar is ready to share! 🎉
          </motion.p>
        </div>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 rounded-2xl p-6 mb-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-4 font-handwritten" style={{ color: calendar.palette.colors[0] }}>
            Share Your Calendar
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Share Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 bg-gray-50"
                />
                <button
                  onClick={handleCopy}
                  className="px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                  style={{ backgroundColor: calendar.palette.colors[0], color: '#FFFFFF' }}
                >
                  {copied ? (
                    <>
                      ✓ Copied!
                    </>
                  ) : (
                    <>
                      📋 Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">
                Share this link with your recipient. They can open one door each day based on their timezone!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push(`/calendar/${shareId}`)}
                  className="flex-1 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 font-handwritten"
                  style={{ backgroundColor: calendar.palette.colors[0], color: '#FFFFFF' }}
                >
                  🔗 View Calendar
                </button>
                <button
                  onClick={() => router.push('/admin')}
                  className="px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity border-2 font-handwritten"
                  style={{ 
                    borderColor: calendar.palette.colors[0],
                    color: calendar.palette.colors[0],
                    backgroundColor: 'transparent',
                  }}
                >
                  Edit Doors
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preview Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-600 font-handwritten"
        >
          <p>💡 Tip: Doors unlock automatically based on the recipient's timezone!</p>
        </motion.div>
      </div>
    </div>
  )
}
