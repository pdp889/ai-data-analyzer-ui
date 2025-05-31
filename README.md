# AI Data Analyzer

An interactive web application that combines AI-powered data analysis with natural language chat capabilities. Upload your data files and get instant insights, or ask questions about your data in natural language.

## Features

- **File Analysis**: Upload CSV, XLSX, or XLS files for instant AI-powered analysis
- **Interactive Chat**: Ask questions about your data in natural language
- **Smart Insights**: Get automated insights and anomalies detection
- **Dataset Profile**: View detailed statistics and information about your dataset
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **Animations**: Framer Motion
- **File Handling**: React Dropzone
- **Notifications**: React Hot Toast

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
   The project includes pre-configured environment files:
   - `.env.development` - Development settings (API URL: http://localhost:3000/api)
   - `.env.production` - Production settings (update with your production API URL)

   No additional setup is needed for development. For production, update the API URL in `.env.production`.

4. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

1. Build the project:
   ```bash
   npm run build
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

### Key Architectural Decisions

1. **Feature-First Organization**:
   - Each feature is self-contained with its own components, hooks, services, and types
   - Promotes modularity and maintainability
   - Makes it easier to understand and modify feature-specific code

2. **Service Layer**:
   - API calls are abstracted into service files
   - Services handle error handling and response formatting
   - Hooks use services for data fetching and mutations

3. **Shared Resources**:
   - Common components, hooks, and utilities are placed in the shared directory
   - Constants are separated into their own files
   - Type definitions are co-located with their features

4. **Type Safety**:
   - Comprehensive TypeScript types for all components and functions
   - Explicit return types for better type inference
   - Shared type definitions for common interfaces

## Environment Variables

- `VITE_API_URL`: Base URL for the API
- `VITE_ENV`: Environment name (development/production)

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
