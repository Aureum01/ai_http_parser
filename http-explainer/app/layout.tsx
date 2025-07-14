import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HTTP-Explainer | Analyze HTTP Messages with AI",
  description:
    "Professional tool for analyzing HTTP requests and responses. Get detailed explanations of headers, methods, status codes, and security implications.",
  keywords: ["HTTP", "security", "analysis", "Burp Suite", "web security", "penetration testing"],
  authors: [{ name: "HTTP-Explainer" }],
  openGraph: {
    title: "HTTP-Explainer",
    description: "Analyze HTTP messages with AI-powered explanations",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HTTP-Explainer",
    description: "Analyze HTTP messages with AI-powered explanations",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
