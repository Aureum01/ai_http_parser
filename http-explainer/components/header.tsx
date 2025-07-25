"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Globe } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 max-w-7xl">
        <div className="flex items-center space-x-2">
          <Globe className="h-6 w-6" />
          <span className="font-bold text-lg">HTTP-Explainer</span>
        </div>
        <ModeToggle />
      </div>
    </header>
  )
}
