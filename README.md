# AI Data Analyzer

An interactive web application that combines AI-powered data analysis with natural language chat capabilities. Upload your data files and get instant insights, or ask questions about your data in natural language.

## Features

- **File Analysis**: Upload CSV, XLSX, or XLS files for instant AI-powered analysis
- **Interactive Chat**: Ask questions about your data in natural language
- **Smart Insights**: Get automated insights and anomalies detection
- **Dataset Profile**: View detailed statistics and information about your dataset
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Analysis**: Get instant feedback on your data
- **Session Management**: Clear analysis sessions when needed
- **Secure File Handling**: Robust file validation and security measures

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Animations**: Framer Motion
- **File Handling**: React Dropzone
- **Notifications**: React Hot Toast
- **Build Tool**: Vite
- **Code Quality**: ESLint + TypeScript strict mode

## Security Features

- Content Security Policy (CSP) implementation
- Input sanitization for chat messages
- Secure file validation
- XSS protection
- CSRF protection
- Secure headers configuration
- Environment variable protection
- Request timeout handling
- Error handling without information leakage

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-data-analyzer-ui.git
   cd ai-data-analyzer-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment Configuration:
   Create a `.env.development` file with:
   ```
   VITE_API_URL=http://localhost:3000/api
   VITE_ENV=development
   ```

   For production, create a `.env.production` file with your production API URL.

4. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

1. Build the project:
   ```bash
   npm run build
   ```

2. Preview the production build:
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── features/                # Feature-based modules
│   ├── analysis/           # Analysis feature
│   │   ├── components/     # Analysis-specific components
│   │   ├── hooks/         # Analysis-specific hooks
│   │   ├── services/      # Analysis API services
│   │   └── types/         # Analysis type definitions
│   ├── chat/              # Chat feature
│   │   ├── components/    # Chat-specific components
│   │   ├── hooks/        # Chat-specific hooks
│   │   ├── services/     # Chat API services
│   │   └── types/        # Chat type definitions
│   └── file-upload/       # File upload feature
│       ├── components/    # Upload-specific components
│       ├── constants/     # Upload-specific constants
│       └── types/        # Upload type definitions
├── shared/                # Shared resources
│   ├── components/       # Reusable components
│   ├── constants/       # Shared constants
│   ├── hooks/          # Shared hooks
│   ├── services/       # Shared services
│   └── types/          # Shared type definitions
└── assets/             # Static assets
```

## Key Architectural Decisions

1. **Feature-First Organization**:
   - Each feature is self-contained with its own components, hooks, services, and types
   - Promotes modularity and maintainability
   - Makes it easier to understand and modify feature-specific code

2. **Service Layer**:
   - API calls are abstracted into service files
   - Services handle error handling and response formatting
   - Hooks use services for data fetching and mutations
   - Request timeouts and error handling implemented

3. **Shared Resources**:
   - Common components, hooks, and utilities are placed in the shared directory
   - Constants are separated into their own files
   - Type definitions are co-located with their features

4. **Type Safety**:
   - Comprehensive TypeScript types for all components and functions
   - Explicit return types for better type inference
   - Shared type definitions for common interfaces

5. **Security**:
   - CSP implementation for resource control
   - Input sanitization for user inputs
   - Secure file handling and validation
   - Environment variable protection
   - Secure headers configuration

## Environment Variables

- `VITE_API_URL`: Base URL for the API
- `VITE_ENV`: Environment name (development/production)

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## Performance Optimizations

- Code splitting for better load times
- Optimized build configuration
- Efficient state management with React Query
- Proper error boundary implementation
- Request timeout handling
- Efficient file handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- State management with [TanStack Query](https://tanstack.com/query)
- File handling with [React Dropzone](https://react-dropzone.js.org/)
