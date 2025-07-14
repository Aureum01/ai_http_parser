"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { explainHttpMessage } from "@/app/actions/explain-http"
import { parseHttp } from "@/lib/parseHttp"
import { OutputPanel } from "@/components/output-panel"
import { Loader2 } from "lucide-react"

type Mode = "request" | "response" | "both"

export function HttpExplainer() {
  const [requestInput, setRequestInput] = useState("")
  const [responseInput, setResponseInput] = useState("")
  const [singleInput, setSingleInput] = useState("")
  const [mode, setMode] = useState<Mode>("both")
  const [isLoading, setIsLoading] = useState(false)
  const [explanation, setExplanation] = useState("")
  const { toast } = useToast()

  const getCurrentInput = () => {
    if (mode === "both") {
      return `${requestInput}\n\n${responseInput}`.trim()
    }
    return singleInput
  }

  const handleExplain = async () => {
    const currentInput = getCurrentInput()

    if (!currentInput.trim()) {
      toast({
        title: "Input required",
        description: "Please paste an HTTP message to analyze.",
        variant: "destructive",
      })
      return
    }

    // More lenient validation
    const cleanedInput = parseHttp(currentInput)
    if (!cleanedInput) {
      toast({
        title: "Invalid format",
        description: "The input doesn't appear to contain HTTP content. Please paste a valid HTTP request or response.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setExplanation("")

    try {
      const result = await explainHttpMessage(cleanedInput, mode)
      setExplanation(result)
    } catch (error) {
      console.error("Error explaining HTTP message:", error)
      toast({
        title: "Error",
        description: "Failed to analyze the HTTP message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode)
    // Clear inputs when switching modes to avoid confusion
    if (newMode === "both") {
      setSingleInput("")
    } else {
      setRequestInput("")
      setResponseInput("")
    }
  }

  const renderInputArea = () => {
    if (mode === "both") {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          <div className="space-y-2">
            <Label className="text-sm font-medium">HTTP Request</Label>
            <Textarea
              placeholder="Paste your HTTP request here..."
              value={requestInput}
              onChange={(e) => setRequestInput(e.target.value)}
              className="min-h-[200px] resize-none font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">HTTP Response</Label>
            <Textarea
              placeholder="Paste your HTTP response here..."
              value={responseInput}
              onChange={(e) => setResponseInput(e.target.value)}
              className="min-h-[200px] resize-none font-mono text-sm"
            />
          </div>
        </div>
      )
    }

    return (
      <div className="flex-1">
        <Textarea
          placeholder={`Paste your HTTP ${mode} here...`}
          value={singleInput}
          onChange={(e) => setSingleInput(e.target.value)}
          className="min-h-[200px] resize-none font-mono text-sm"
        />
      </div>
    )
  }

  const hasInput = mode === "both" ? requestInput.trim() || responseInput.trim() : singleInput.trim()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
      {/* Input Panel */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>HTTP Message Input</CardTitle>
          <CardDescription>
            Paste your HTTP request, response, or both from Burp Suite or any other tool
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-4">
          {renderInputArea()}

          <div className="space-y-3">
            <Label className="text-sm font-medium">Analysis Mode</Label>
            <RadioGroup value={mode} onValueChange={handleModeChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="request" id="request" />
                <Label htmlFor="request">Request only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="response" id="response" />
                <Label htmlFor="response">Response only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both">Request + Response</Label>
              </div>
            </RadioGroup>
          </div>

          <Button onClick={handleExplain} disabled={isLoading || !hasInput} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Analyzing..." : "Explain"}
          </Button>
        </CardContent>
      </Card>

      {/* Output Panel */}
      <OutputPanel explanation={explanation} isLoading={isLoading} />
    </div>
  )
}
