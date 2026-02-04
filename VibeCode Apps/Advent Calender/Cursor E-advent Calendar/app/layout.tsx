import type { Metadata } from 'next'
import { Courier_Prime } from 'next/font/google'
import './globals.css'
import Snowflakes from './components/Snowflakes'

const courierPrime = Courier_Prime({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Cursor E-Advent Calendar',
  description: 'Personalised e-advent calendar with AI-driven design, palettes and daily messages',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={courierPrime.className}>
        <Snowflakes />
        {children}
      </body>
    </html>
  )
}
