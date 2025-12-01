# 🛸 Rick and Morty Character Explorer

A modern, production-ready React application for exploring characters from the Rick and Morty universe. Built with React 19, TypeScript, TanStack Query v5, Zustand, and Tailwind CSS.

🚀 **[Live Demo](https://rick-morty-geeks.netlify.app/)** | 📦 **[GitHub](https://github.com/simaa99/rick-morty-task)**

## ✨ Features

- **Character Search** with 500ms debouncing
- **Pagination** with prev/next controls
- **Character Details** with episode lists organized by season
- **Dark Mode** with localStorage persistence
- **Responsive Design** from mobile to desktop
- **Performance Optimized** with prefetching and smart caching

## 🚀 Tech Stack

- **React 19.2.0** + **TypeScript 5.9.3**
- **Vite 7.2.4** - Build tool
- **TanStack Query v5** - Server state management
- **Zustand 5.0.2** - UI state management
- **React Router v6** - Routing
- **Tailwind CSS 3.4.17** - Styling
- **Axios** - HTTP client

## 📁 Project Structure

```
src/
├── api/              # API layer
├── components/       # Reusable components
├── hooks/            # Custom hooks
├── pages/            # Page components
├── router/           # Routing config
├── store/            # Zustand store
├── types/            # TypeScript types
└── utils/            # Utility functions
```

## 🛠️ Installation

```bash
# Clone repository
git clone https://github.com/simaa99/rick-morty-task.git
cd rick-morty-task

# Install dependencies
npm install

# Start dev server
npm run dev
```

## 📜 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔌 API

Uses [Rick and Morty API](https://rickandmortyapi.com/documentation)

- `GET /character` - List characters
- `GET /character/:id` - Character details
- `GET /episode/:ids` - Batch episodes

---
