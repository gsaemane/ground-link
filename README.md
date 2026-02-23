# Ground Link – Real Estate Platform

**Ground Link** is a modern, user-friendly real estate listing system designed for the Solomon Islands market (with focus on Honiara and surrounding areas). It features a clean public website for browsing properties and a secure, professional admin dashboard for managing listings.

- **Frontend**: Next.js 15 (App Router) + TypeScript-ready + Tailwind CSS + shadcn/ui  
- **Backend**: Express.js (pure REST API) + MongoDB + Mongoose  
- **Key Features**: Property uploads with images, responsive & modern UI, admin CRUD, dark mode support  
- **Goal**: Provide a professional platform for real estate agents, buyers, and sellers in the Pacific region

## ✨ Screenshots

*(Add your screenshots here – public homepage, property cards, admin dashboard, create form)*

| Public Homepage                  | Admin Dashboard                     | Add New Property Form              |
|----------------------------------|-------------------------------------|------------------------------------|
| ![Public Home](screenshots/public-home.png) | ![Admin Dashboard](screenshots/admin-dashboard.png) | ![Create Property](screenshots/create-property.png) |

## Tech Stack

| Layer       | Technology                              | Purpose                              |
|-------------|-----------------------------------------|--------------------------------------|
| Frontend    | Next.js 14/15 (App Router)              | SSR/SSG, routing, performance        |
| UI/Styling  | Tailwind CSS + shadcn/ui                | Beautiful, accessible components     |
| Backend     | Express.js                              | Lightweight REST API                 |
| Database    | MongoDB + Mongoose                      | Flexible schema for properties       |
| File Upload | Multer (local disk storage)             | Handle property images               |
| Icons       | lucide-react                            | Modern icon library                  |
| Forms       | (Planned: React Hook Form + Zod)        | Type-safe validation                 |

## Project Structure
```
ground-link/
├── backend/                      # Express API server
│   ├── uploads/                  # Stored property images (gitignored)
│   ├── src/
│   │   ├── index.js              # Main server + routes
│   │   ├── models/
│   │   │   └── Property.js       # Mongoose schema
│   │   └── multerConfig.js       # Image upload config
│   ├── .env
│   └── package.json
│
├── frontend/                     # Next.js application
│   ├── src/
│   │   ├── app/
│   │   │   ├── (public)/         # Public site routes (/)
│   │   │   ├── (admin)/          # Admin routes (/admin/...)
│   │   │   ├── globals.css
│   │   │   └── layout.tsx        # Root layout
│   │   ├── components/
│   │   │   ├── PropertyCard.tsx
│   │   │   ├── admin/            # Sidebar, etc.
│   │   │   └── ui/               # shadcn/ui components
│   │   ├── lib/
│   │   │   └── api.ts            # API helpers
│   │   └── types/
│   ├── public/
│   ├── .env.local
│   ├── next.config.mjs
│   └── package.json
│
└── README.md
```


## Current Features

- Public listings page with modern, responsive property cards
- Image upload & static serving
- Admin dashboard with sidebar navigation (shadcn/ui)
- Create new properties (title, description, price, type, image, featured flag)
- Mobile-friendly design + dark mode ready

## Planned Enhancements

- User authentication & admin route protection (NextAuth.js / Clerk)
- Edit / Delete properties
- Property search, filters (price, type, location)
- Detailed property view page
- Contact/inquiry form
- Location integration (maps, coordinates for Honiara areas)
- Cloud storage for images (Cloudinary / S3)
- Advanced validation & better forms

## Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB (local install or MongoDB Atlas)
- npm / pnpm / yarn

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/ground-link.git
cd ground-link
cd backend
npm install

# Copy example env and configure
cp .env.example .env   # (create if needed)
# Edit .env → add your MONGO_URI, PORT=4000

npm run dev
# → API available at http://localhost:4000

cd ../frontend
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:4000" > .env.local

npm run dev
# → Open http://localhost:3000 (public site)
# → Admin: http://localhost:3000/admin/properties
```
