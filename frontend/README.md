# React + Tailwind CSS + Vite

A modern React application built with Vite and styled with Tailwind CSS.

## Features

- ⚡️ **Vite** - Lightning fast build tool and dev server
- ⚛️ **React 18** - Latest React with hooks and modern features
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔥 **Hot Module Replacement** - Instant feedback during development
- 📦 **ESLint** - Code linting and formatting

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
├── public/
├── src/
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles with Tailwind imports
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── postcss.config.js    # PostCSS configuration
```

## Customization

### Tailwind CSS

The Tailwind configuration is located in `tailwind.config.js`. You can customize:
- Colors, fonts, and spacing
- Breakpoints and container sizes
- Plugins and utilities

### Vite Configuration

Vite settings can be modified in `vite.config.js` to add:
- Plugins
- Build options
- Development server settings

## Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
