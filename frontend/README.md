# ThoughtStream Frontend

A modern, responsive Next.js frontend for the ThoughtStream blog platform. Built with Next.js 14 (App Router), Tailwind CSS, and Zustand for state management.

## Features

- 🎨 **Modern Design** - Clean, minimal design inspired by Aceternity UI
- 📱 **Responsive** - Fully responsive design that works on all devices
- 🔐 **Authentication** - JWT-based authentication with protected routes
- ✍️ **Blog Management** - Create, read, and manage blog posts
- 🎯 **User Profiles** - User profile management and account settings
- ⚡ **Fast Performance** - Optimized with Next.js App Router and modern React patterns

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (Cloudflare Workers with Hono)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8787/api/v1
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend-nextjs/
├── app/                    # Next.js App Router pages
│   ├── blog/[id]/         # Individual blog page
│   ├── blogs/             # Blog listing page
│   ├── create/            # Create blog page
│   ├── profile/           # User profile page
│   ├── signin/            # Sign in page
│   ├── signup/            # Sign up page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   └── Navbar.tsx         # Navigation component
├── lib/                   # Utility libraries
│   ├── api.ts            # API integration
│   ├── store.ts          # Zustand store
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## API Integration

The frontend connects to your Cloudflare Workers backend with the following endpoints:

### Authentication
- `POST /api/v1/user/signin` - User sign in
- `POST /api/v1/user/signup` - User sign up

### Blog Management
- `GET /api/v1/blog/bulk` - Get all blogs
- `GET /api/v1/blog/:id` - Get specific blog
- `POST /api/v1/blog/publish` - Create new blog
- `PUT /api/v1/blog` - Update blog

## Key Features

### Authentication Flow
- JWT token storage in localStorage
- Automatic token injection in API requests
- Protected route handling
- Automatic redirect on authentication errors

### Blog Management
- Create new blog posts with rich text editor
- View all blogs with pagination
- Individual blog pages with full content
- Author-specific edit permissions

### Responsive Design
- Mobile-first approach
- Glass morphism effects
- Smooth animations and transitions
- Modern gradient backgrounds

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8787/api/v1` |

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License. 