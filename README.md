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

3. Set up environment variables:
   - Copy `.env.example` to `.env.development`
   - Update the API URL to point to your development API

4. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

1. Set up production environment:
   - Copy `.env.example` to `.env.production`
   - Update the API URL to point to your production API

2. Build the project:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── assets/        # Static assets
```

## Environment Variables

- `VITE_API_URL`: Base URL for the API
- `VITE_ENV`: Environment name (development/production)

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
