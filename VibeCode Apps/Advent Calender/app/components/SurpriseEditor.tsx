'use client'

import { useState, useRef } from 'react'
import { ColorPalette, DoorSurprise, SurpriseType } from '../store'
import { motion } from 'framer-motion'

interface SurpriseEditorProps {
  day: number
  palette: ColorPalette
  currentSurprise?: DoorSurprise
  onSave: (surprise: DoorSurprise) => void
}

export default function SurpriseEditor({ day, palette, currentSurprise, onSave }: SurpriseEditorProps) {
  const [surpriseType, setSurpriseType] = useState<SurpriseType>(currentSurprise?.type || 'text')
  const [textContent, setTextContent] = useState(currentSurprise?.type === 'text' ? currentSurprise.content : '')
  const [imageUrl, setImageUrl] = useState(currentSurprise?.type === 'image' ? currentSurprise.content : '')
  const [linkUrl, setLinkUrl] = useState(currentSurprise?.type === 'link' ? currentSurprise.content : '')
  const [linkTitle, setLinkTitle] = useState(currentSurprise?.title || '')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // For now, create a local object URL
      // In production, you'd upload to a server/CDN
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  const handleSave = () => {
    let content = ''
    let title = ''

    switch (surpriseType) {
      case 'text':
        if (!textContent.trim()) {
          alert('Please enter some text!')
          return
        }
        content = textContent.trim()
        break
      case 'image':
        if (!imageUrl.trim()) {
          alert('Please upload an image!')
          return
        }
        content = imageUrl.trim()
        break
      case 'link':
        if (!linkUrl.trim()) {
          alert('Please enter a link!')
          return
        }
        content = linkUrl.trim()
        title = linkTitle.trim()
        break
    }

    onSave({
      type: surpriseType,
      content,
      title: title || undefined,
    })
  }

  const surpriseTypes: { type: SurpriseType; label: string; icon: string }[] = [
    { type: 'text', label: 'Text', icon: '✍️' },
    { type: 'image', label: 'Image', icon: '🖼️' },
    { type: 'link', label: 'Link', icon: '🔗' },
  ]

  return (
    <div className="space-y-6">
      {/* Type Selection */}
      <div>
        <label className="block text-sm font-semibold mb-3 text-gray-700">
          Surprise Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          {surpriseTypes.map(({ type, label, icon }) => (
            <button
              key={type}
              onClick={() => setSurpriseType(type)}
              className={`p-4 rounded-xl border-2 transition-all font-handwritten ${
                surpriseType === type
                  ? 'border-pink-500 bg-pink-50 scale-105'
                  : 'border-gray-200 hover:border-pink-300'
              }`}
              style={{
                borderColor: surpriseType === type ? palette.colors[0] : undefined,
                backgroundColor: surpriseType === type ? `${palette.colors[3]}40` : undefined,
              }}
            >
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-sm font-semibold">{label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Editor */}
      <div>
        {surpriseType === 'text' && (
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Your Message
            </label>
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Write a sweet message, quote, or question..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 text-base font-handwritten"
              rows={5}
              style={{
                fontFamily: 'var(--font-gaegu), cursive',
              }}
            />
          </div>
        )}

        {surpriseType === 'image' && (
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Upload Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-xl hover:border-pink-500 transition-colors text-gray-600"
            >
              {imageUrl ? (
                <div className="space-y-2">
                  <img src={imageUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                  <p className="text-sm">Click to change image</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-4xl mb-2">📷</div>
                  <p>Click to upload an image</p>
                </div>
              )}
            </button>
          </div>
        )}

        {surpriseType === 'link' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Link URL
              </label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://spotify.com/... or https://youtube.com/... or https://maps.google.com/..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Supports Spotify, YouTube, Google Maps, and any web link
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Title (Optional)
              </label>
              <input
                type="text"
                value={linkTitle}
                onChange={(e) => setLinkTitle(e.target.value)}
                placeholder="e.g., Our Favorite Song"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-pink-500 font-handwritten"
              />
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-4 text-white rounded-full text-lg font-bold hover:opacity-90 transition-opacity shadow-lg font-handwritten"
        style={{ backgroundColor: palette.colors[0] }}
      >
        Save Surprise ✨
      </button>
    </div>
  )
}
