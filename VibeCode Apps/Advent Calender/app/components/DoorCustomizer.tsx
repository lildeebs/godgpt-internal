'use client'

import { useState } from 'react'
import { ColorPalette } from '../store'

interface DoorCustomizerProps {
  day: number
  palette: ColorPalette
  onPromptChange: (prompt: string) => void
  currentPrompt?: string
}

export default function DoorCustomizer({
  day,
  palette,
  onPromptChange,
  currentPrompt = '',
}: DoorCustomizerProps) {
  const [prompt, setPrompt] = useState(currentPrompt)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    // TODO: Integrate with AI image generation API
    // For now, just save the prompt
    onPromptChange(prompt.trim())
    
    setTimeout(() => {
      setIsGenerating(false)
      // In a real implementation, this would call an AI API to generate the door design
      alert('Door design prompt saved! AI generation coming soon.')
    }, 1000)
  }

  const examplePrompts = [
    'hand-drawn heart with doodle style',
    'sketchy envelope with love letter',
    'doodle style chocolate box',
    'hand-drawn candle with flame',
    'sketchy gift box with bow',
  ]

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h3 className="text-lg font-bold mb-3" style={{ color: palette.colors[0] }}>
        Customize Door {day}
      </h3>
      
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          AI Prompt for Door Design
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your door design... (e.g., 'hand-drawn heart locket with I ❤️ U inside, doodle style')"
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 text-sm"
          rows={3}
        />
        <p className="text-xs text-gray-500 mt-1">
          Describe the design you want in hand-drawn, doodle style
        </p>
      </div>

      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-600 mb-2">Example prompts:</p>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setPrompt(example)}
              className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
        className="w-full py-2 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: palette.colors[0] }}
      >
        {isGenerating ? 'Generating...' : 'Generate Door Design ✨'}
      </button>
    </div>
  )
}
