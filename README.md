# Jobbr — Job Application Tracker

A full-stack job application tracker built with Next.js 14 (App Router) and Supabase.

## Tech Stack
- **Framework**: Next.js 14 (App Router, TypeScript)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Fonts**: Syne (display) + Inter (body) via Google Fonts

## Project Structure
```
src/
├── app/
│   ├── layout.tsx                      # Root layout
│   ├── page.tsx                        # Redirects → /dashboard
│   ├── globals.css
│   ├── dashboard/page.tsx              # Stats + full table
│   └── applications/
│       ├── page.tsx                    # All applications
│       ├── new/page.tsx                # Add form
│       └── [id]/edit/page.tsx          # Edit form
├── components/
│   ├── layout/Sidebar.tsx
│   └── ui/
│       ├── ApplicationForm.tsx         # Shared new/edit form
│       ├── ApplicationsTable.tsx       # Filterable table
│       ├── CompanyLogo.tsx             # Auto-coloured avatar
│       ├── StatCard.tsx
│       └── StatusBadge.tsx
├── lib/
│   ├── supabase.ts                     # Supabase client
│   └── applications.ts                 # CRUD functions
└── types/index.ts

supabase/
└── migration.sql                       # Run this first in Supabase SQL editor
```

## Setup

### 1. Create a Supabase project
1. Go to [supabase.com](https://supabase.com) → New project
2. Open the **SQL Editor** and run the contents of `supabase/migration.sql`
3. Copy your project URL and anon key from **Settings → API**

### 2. Configure environment variables
```bash
cp .env.example .env.local
# Fill in your Supabase URL and anon key
```

### 3. Install and run
```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Deploy to Vercel
1. Push to GitHub
2. Import the repo at [vercel.com](https://vercel.com)
3. Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as environment variables
4. Deploy

## Features
- Dashboard with live stats (total, interviews, offers, response rate)
- Filterable applications table by status
- Add / edit / delete applications
- Colour-coded status badges and priority indicators
- Auto-coloured company logo avatars
- Data persisted in Supabase PostgreSQL
