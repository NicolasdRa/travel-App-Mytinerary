# Mytinerary - Frontend

A modern, responsive travel planning application that allows users to discover, create, and share travel itineraries for cities around the world.

## 🌟 Features

### Core Functionality
- **City Discovery**: Browse and explore cities from around the world
- **Itinerary Management**: Create, view, and manage detailed travel itineraries
- **Activity Planning**: Add and organize activities within itineraries
- **User Profiles**: Personal user accounts with profile management
- **Social Features**: Like, favorite, and comment on itineraries and activities
- **Image Management**: Upload and crop images for itineraries and activities

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Modern Material-UI design system
- **Search & Filter**: Advanced search functionality for cities and itineraries
- **Real-time Updates**: Dynamic content loading and state management
- **Performance Optimized**: Lazy loading, code splitting, and memoization

### Authentication & Security
- **JWT Authentication**: Secure token-based authentication
- **OAuth Integration**: Google Sign-In support
- **Password Reset**: Email-based password recovery
- **Protected Routes**: Role-based access control

## 🚀 Technology Stack

### Frontend Framework
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Full type safety and enhanced developer experience
- **React Router 6** - Client-side routing with lazy loading

### State Management
- **Redux Toolkit** - Modern Redux with simplified configuration
- **RTK Query** - Efficient data fetching and caching
- **React Redux** - React bindings for Redux

### UI/UX
- **Material-UI (MUI)** - React component library with Material Design
- **Styled Components** - CSS-in-JS styling solution
- **React Image Crop** - Image cropping functionality
- **React Spinners** - Loading indicators

### Development Tools
- **Vite** - Lightning-fast build tool with hot module replacement
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **TypeScript Compiler** - Type checking and compilation

### HTTP & API
- **Axios** - HTTP client with interceptors and request/response handling
- **Custom API Service Layer** - Centralized API management with TypeScript

### Performance & Optimization
- **React.memo** - Component memoization
- **useMemo & useCallback** - Hook-based optimization
- **Code Splitting** - Dynamic imports for route-based code splitting
- **Lazy Loading** - On-demand component loading

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── forms/           # Form components (Login, Signup, etc.)
│   ├── pages/           # Page-level components
│   ├── sections/        # Major section components
│   └── ui/              # Basic UI elements
├── features/            # Feature-based organization
│   └── auth/           # Authentication feature
├── config/             # Configuration files
├── constants/          # Application constants
├── hooks/              # Custom React hooks
├── redux/              # Redux store and slices
├── services/           # API service layer
├── theme/              # Material-UI theme configuration
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd travel-App-Mytinerary/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_RAPID_API_KEY=your_rapid_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:3000`

## 📜 Available Scripts

### Development
```bash
npm run dev        # Start Vite development server
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run test       # Run test suite
```

### Production
```bash
npm run build      # Create optimized production build
npm install -g serve
serve -s build     # Serve production build locally
```

## 🏗️ Architecture & Patterns

### Component Architecture
- **Feature-based organization** - Components grouped by domain/feature
- **Compound components** - Complex UI patterns with multiple related components
- **Render props & custom hooks** - Reusable logic patterns

### State Management
- **Redux Toolkit slices** - Simplified Redux state management
- **Async thunks** - Handling asynchronous operations
- **Selectors** - Optimized state selection with memoization

### API Architecture
- **Service layer pattern** - Centralized API communication
- **Request/Response interceptors** - Global error handling and logging
- **TypeScript interfaces** - Fully typed API contracts

### Performance Optimizations
- **Memoization strategies** - React.memo, useMemo, useCallback
- **Code splitting** - Route-based and component-based splitting
- **Bundle optimization** - Tree shaking and dynamic imports
- **Vite optimizations** - ESBuild for faster builds, optimized dependency pre-bundling

## 🔧 Configuration

### API Configuration
The application uses a centralized configuration system:
- `src/config/api.config.ts` - API endpoints and settings
- `src/config/app.config.ts` - Application-wide settings

### Theme Configuration
Material-UI theme customization in `src/theme/Theme.ts`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The build folder can be deployed to any static hosting service:
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.