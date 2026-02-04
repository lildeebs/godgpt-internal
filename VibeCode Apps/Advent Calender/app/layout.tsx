import type { Metadata } from 'next'
import { Courier_Prime, Gaegu, Indie_Flower } from 'next/font/google'
import './globals.css'
import Snowflakes from './components/Snowflakes'

const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-courier',
})

const gaegu = Gaegu({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-gaegu',
})

const indieFlower = Indie_Flower({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-indie',
})

export const metadata: Metadata = {
  title: 'Advent Calendar',
  description: 'Create your personalized advent calendar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${courierPrime.variable} ${gaegu.variable} ${indieFlower.variable} ${courierPrime.className}`}>
        <Snowflakes />
        {children}
      </body>
    </html>
  )
}
