# Roxonn - Decentralized Contribution Platform

## Overview

Roxonn is a modern, decentralized platform that enables developers to contribute to software projects and earn rewards. Built with Next.js 13, TypeScript, and Tailwind CSS, it features a dual-content approach that caters to both technical and non-technical users.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/Roxonn-FutureTech/roxonn-website.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev
```

## 🏗️ Architecture

### Tech Stack

- **Framework**: Next.js 13.5.1
- **Language**: TypeScript 5.2.2
- **Styling**: Tailwind CSS 3.3.3
- **Animation**: Framer Motion 11.0.14
- **3D Graphics**: React Three Fiber 8.15.19
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier
- **State Management**: React Context + Hooks

### Key Features

- Dual-content system (technical/simple versions)
- Automatic content switching (10s interval)
- Glass-effect modern UI
- 3D interactive elements
- Responsive design
- Accessibility-first approach

### Directory Structure

\`\`\`
roxonn-website/
├── app/ # Next.js 13 app directory
├── components/ # React components
│ ├── sections/ # Main page sections
│ └── ui/ # Reusable UI components
├── context/ # React Context providers
├── hooks/ # Custom React hooks
├── lib/ # Utility functions
├── public/ # Static assets
├── styles/ # Global styles
├── types/ # TypeScript types
└── **tests**/ # Test files
\`\`\`

## 🔧 Development

### Environment Variables

Required environment variables:

- \`NEXT_PUBLIC_SITE_URL\`: Your site's URL
- \`NEXT_PUBLIC_GITHUB_CLIENT_ID\`: GitHub OAuth client ID
- \`NEXT_PUBLIC_GITHUB_REDIRECT_URI\`: GitHub OAuth redirect URI

### Available Scripts

- \`npm run dev\`: Start development server
- \`npm run build\`: Build for production
- \`npm run start\`: Start production server
- \`npm run test\`: Run tests
- \`npm run lint\`: Run linting
- \`npm run format\`: Format code

### Code Quality

- Pre-commit hooks with Husky
- Automated code formatting with Prettier
- ESLint for code quality
- TypeScript for type safety

## 🧪 Testing

- Unit tests with Jest
- Component tests with React Testing Library
- Run tests: \`npm run test\`
- Watch mode: \`npm run test:watch\`

## 📈 Performance

- Automatic code splitting
- Image optimization
- Web Vitals monitoring
- Error tracking
- Performance monitoring

## 🔒 Security

- Environment variable validation
- Content Security Policy
- Secure authentication flow
- Input sanitization

## 🌐 SEO

- Comprehensive metadata
- OpenGraph tags
- Twitter cards
- Semantic HTML

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: 0-640px
  - Tablet: 641-1024px
  - Desktop: 1025px+

## 🎨 UI Components

- Glass-effect cards
- Loading spinners
- Custom cursor
- 3D elements
- Animated transitions

## 🔄 State Management

- Content version context
- Theme provider
- Authentication state
- Form state management

## 📚 Documentation

- Component documentation in \`/docs\`
- API documentation
- Contribution guidelines
- Security policy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

MIT License - see LICENSE file

## 🙋‍♂️ Support

- GitHub Issues
- Documentation
- Community Discord
