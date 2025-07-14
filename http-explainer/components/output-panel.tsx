"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Loader2, FileText } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface OutputPanelProps {
  explanation: string
  isLoading: boolean
}

export function OutputPanel({ explanation, isLoading }: OutputPanelProps) {
  if (isLoading) {
    return (
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            Analyzing HTTP Message
          </CardTitle>
          <CardDescription>Processing your HTTP message with AI analysis...</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!explanation) {
    return (
      <Card className="flex flex-col items-center justify-center">
        <CardContent className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <CardTitle className="mb-2">Ready to Analyze</CardTitle>
          <CardDescription>
            Paste an HTTP message in the input panel and click "Explain" to see a detailed analysis of headers, methods,
            status codes, and potential security implications.
          </CardDescription>
        </CardContent>
      </Card>
    )
  }

  // Parse the explanation into sections for accordion
  const sections = parseExplanationIntoSections(explanation)

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>HTTP Analysis Results</CardTitle>
        <CardDescription>Detailed breakdown of your HTTP message</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="h-full">
          {sections.length > 1 ? (
            <Accordion type="multiple" defaultValue={["summary"]} className="w-full">
              {sections.map((section, index) => (
                <AccordionItem key={index} value={section.id}>
                  <AccordionTrigger className="text-left">{section.title}</AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{section.content}</ReactMarkdown>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{explanation}</ReactMarkdown>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function parseExplanationIntoSections(explanation: string) {
  const sections = []
  const lines = explanation.split("\n")
  let currentSection = { id: "summary", title: "Overall Summary", content: "" }

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentSection.content.trim()) {
        sections.push(currentSection)
      }
      const title = line.replace("## ", "")
      const id = title.toLowerCase().replace(/[^a-z0-9]/g, "-")
      currentSection = { id, title, content: "" }
    } else {
      currentSection.content += line + "\n"
    }
  }

  if (currentSection.content.trim()) {
    sections.push(currentSection)
  }

  return sections.length > 0 ? sections : [{ id: "content", title: "Analysis", content: explanation }]
}
