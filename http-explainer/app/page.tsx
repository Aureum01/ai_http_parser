import { Suspense } from "react"
import { Header } from "@/components/header"
import { HttpExplainer } from "@/components/http-explainer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <Suspense fallback={<div>Loading...</div>}>
          <HttpExplainer />
        </Suspense>
      </main>
    </div>
  )
}
