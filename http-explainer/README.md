# HTTP-Explainer

A professional, AI-powered tool for analyzing HTTP requests and responses. Perfect for security researchers, developers, and anyone working with HTTP traffic analysis.

## Features

- 🔍 **Smart Analysis**: AI-powered explanations of HTTP messages
- 🎯 **Multiple Modes**: Analyze requests, responses, or both
- 🌓 **Dark/Light Mode**: Comfortable viewing in any environment
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🔒 **Security Focus**: Identifies potential security implications
- 🚀 **Fast & Clean**: Minimal, professional interface

## Quick Start

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd http-explainer
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   pnpm install
   # or
   npm install
   \`\`\`

3. **Set up environment variables**
   Create a \`.env.local\` file in the root directory:
   \`\`\`
   OPENAI_API_KEY=your_openai_api_key_here
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   pnpm dev
   # or
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Paste HTTP Message**: Copy your HTTP request/response from Burp Suite or any other tool
2. **Select Mode**: Choose whether you're analyzing a request, response, or both
3. **Click Explain**: Get detailed AI-powered analysis with security insights

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **AI**: OpenAI GPT-4o
- **Deployment**: Vercel

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| \`OPENAI_API_KEY\` | Your OpenAI API key for AI analysis | Yes |

## Deployment

This app is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your \`OPENAI_API_KEY\` environment variable
4. Deploy!

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
