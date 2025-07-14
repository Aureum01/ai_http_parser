/**
 * Parse and validate HTTP message format
 * Removes ANSI escape codes and performs basic validation
 */
export function parseHttp(input: string): string | null {
  if (!input || typeof input !== "string") {
    return null
  }

  // Remove ANSI escape codes (common in Burp Suite output)
  const cleanedInput = input.replace(/\x1b\[[0-9;]*m/g, "").trim()

  if (cleanedInput.length === 0) {
    return null
  }

  // Very basic validation - just check if it contains some HTTP-like content
  const lines = cleanedInput.split("\n")
  const firstLine = lines[0]?.trim()

  if (!firstLine) {
    return null
  }

  // More lenient patterns - just check for basic HTTP structure
  const hasHttpMethod =
    /^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS|TRACE|CONNECT|PROPFIND|PROPPATCH|MKCOL|COPY|MOVE|LOCK|UNLOCK)\s+/i.test(
      firstLine,
    )
  const hasHttpResponse = /^HTTP\/\d+\.\d+\s+\d{3}/i.test(firstLine)
  const hasHttpVersion = /HTTP\/\d+\.\d+/i.test(firstLine)

  // Accept if it looks like HTTP in any way
  if (hasHttpMethod || hasHttpResponse || hasHttpVersion) {
    return cleanedInput
  }

  // Also accept if it contains common HTTP headers
  const commonHeaders =
    /^(Host|User-Agent|Accept|Content-Type|Content-Length|Authorization|Cookie|Set-Cookie|Cache-Control|Connection):/im
  if (commonHeaders.test(cleanedInput)) {
    return cleanedInput
  }

  // If none of the above, it's probably not HTTP
  return null
}

/**
 * Extract basic info from HTTP message for quick preview
 */
export function extractHttpInfo(input: string) {
  const lines = input.split("\n")
  const firstLine = lines[0]?.trim()

  if (!firstLine) return null

  // Parse request line
  const requestMatch = firstLine.match(
    /^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS|TRACE|CONNECT)\s+(\S+)\s+HTTP\/(\d\.\d)/i,
  )
  if (requestMatch) {
    return {
      type: "request",
      method: requestMatch[1].toUpperCase(),
      path: requestMatch[2],
      version: requestMatch[3],
    }
  }

  // Parse response line
  const responseMatch = firstLine.match(/^HTTP\/(\d\.\d)\s+(\d{3})\s*(.*)/i)
  if (responseMatch) {
    return {
      type: "response",
      version: responseMatch[1],
      status: Number.parseInt(responseMatch[2]),
      statusText: responseMatch[3] || "",
    }
  }

  return null
}
