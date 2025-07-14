import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kravings Club - Cannabis Delivery Los Angeles',
  description: 'Premium cannabis delivery service in Los Angeles. Fast, discreet delivery with top-quality products.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}