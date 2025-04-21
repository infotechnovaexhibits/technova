import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "../lib/utils"
import { ReduxProvider } from "../lib/redux/provider"
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: '%s | Technova Exhibits',
    default: 'Technova Exhibits',
  },
  description: "Revolutionizing the Exhibition world — one platform, endless solutions",
  keywords: ["exhibition", "exhibition services", "exhibition design", "exhibition construction", "exhibition installation"],
  authors: [{ name: "Technova Exhibits" }],
  creator: "Technova Exhibits",
  metadataBase: new URL('https://technovaexhibits.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  )
} 