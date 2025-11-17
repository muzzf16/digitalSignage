# Dokumentasi Pengembangan Digital Signage BPR

## 📋 Daftar Isi

1. [Tinjauan Proyek](#tinjauan-proyek)
2. [Arsitektur Aplikasi](#arsitektur-aplikasi)
3. [Struktur Direktori](#struktur-direktori)
4. [Setup Lingkungan Pengembangan](#setup-lingkungan-pengembangan)
5. [Komponen Utama](#komponen-utama)
6. [API Endpoints](#api-endpoints)
7. [State Management](#state-management)
8. [Styling & UI](#styling--ui)
9. [Animasi & Transisi](#animasi--transisi)
10. [Integrasi Database](#integrasi-database)
11. [Testing](#testing)
12. [Deployment](#deployment)
13. [Troubleshooting](#troubleshooting)
14. [Best Practices](#best-practices)

---

## 📖 Tinjauan Proyek

Digital Signage Bank Perekonomian Rakyat adalah aplikasi web modern untuk menampilkan informasi perbankan secara real-time dengan fitur:

- **Dual Panel Layout**: Promo (kiri) + Informasi (kanan)
- **Real-time Updates**: Auto-refresh data setiap 30 detik
- **Admin Panel**: Manajemen konten terintegrasi
- **Responsive Design**: Optimal di berbagai ukuran layar
- **Fullscreen Mode**: Untuk display signage

### 🎯 Target Pengguna

- **Primary**: Nasabah Bank BPR
- **Secondary**: Staff Bank untuk manajemen konten
- **Tertiary**: Pengunjung kantor cabang

---

## 🏗️ Arsitektur Aplikasi

### 📊 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Digital Signage BPR              │
├─────────────────────────────────────────────────────────────┤
│  Frontend (Next.js 15 + TypeScript)              │
│  ┌─────────────────┐  ┌─────────────────────────┐   │
│  │ Main Display   │  │   Admin Panel        │   │
│  │ (page.tsx)    │  │ (content-management) │   │
│  └─────────────────┘  └─────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  API Layer (Next.js API Routes)                   │
│  ┌─────────────┐ ┌─────────────┐ ┌──────────┐ │
│  │ /api/slides │ │ /api/rates  │ │ /api/news│ │
│  └─────────────┘ └─────────────┘ └──────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Data Layer (Mock → Database)                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │ In-Memory Storage (Production: PostgreSQL)     │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 🔧 Teknologi Stack

| Layer | Technology | Versi | Keterangan |
|--------|-------------|--------|-------------|
| **Framework** | Next.js | 15.3.5 | App Router, Server Components |
| **Language** | TypeScript | 5.x | Type Safety |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS |
| **UI Components** | shadcn/ui | Latest | New York Style |
| **Icons** | Lucide React | Latest | Consistent Icon Set |
| **Animations** | Framer Motion | Latest | Declarative Animations |
| **State Management** | React Hooks | Built-in | useState, useEffect |
| **API** | Next.js API Routes | Built-in | RESTful Endpoints |
| **Database** | PostgreSQL | Future | Prisma ORM |

---

## 📁 Struktur Direktori

```
digital-signage-bpr/
├── 📄 README.md                    # Dokumentasi utama
├── 📄 package.json                 # Dependencies & scripts
├── 📄 next.config.js              # Konfigurasi Next.js
├── 📄 tailwind.config.js          # Konfigurasi Tailwind
├── 📄 tsconfig.json               # Konfigurasi TypeScript
├── 📁 src/                       # Source code
│   ├── 📁 app/                   # App Router pages
│   │   ├── 📁 api/              # API routes
│   │   │   ├── 📁 slides/       # Slide management
│   │   │   │   └── 📄 route.ts
│   │   │   ├── 📁 rates/        # Interest rates
│   │   │   │   └── 📄 route.ts
│   │   │   ├── 📁 news/         # News & updates
│   │   │   │   └── 📄 route.ts
│   │   │   └── 📁 exchange-rates/ # Exchange rates
│   │   │       └── 📄 route.ts
│   │   ├── 📁 content-management/ # Admin panel
│   │   │   └── 📄 page.tsx
│   │   ├── 📄 layout.tsx         # Root layout
│   │   ├── 📄 page.tsx          # Main display
│   │   └── 📄 globals.css        # Global styles
│   ├── 📁 components/            # Reusable components
│   │   ├── 📁 ui/               # shadcn/ui components
│   │   │   ├── 📄 button.tsx
│   │   │   ├── 📄 card.tsx
│   │   │   ├── 📄 badge.tsx
│   │   │   ├── 📄 tabs.tsx
│   │   │   ├── 📄 dialog.tsx
│   │   │   ├── 📄 input.tsx
│   │   │   ├── 📄 label.tsx
│   │   │   ├── 📄 textarea.tsx
│   │   │   ├── 📄 select.tsx
│   │   │   └── 📄 switch.tsx
│   │   └── 📄 content-management.tsx
│   └── 📁 lib/                  # Utility functions
│       └── 📄 db.ts              # Database client (future)
├── 📁 prisma/                    # Database schema (future)
│   └── 📄 schema.prisma
├── 📁 public/                    # Static assets
└── 📁 node_modules/              # Dependencies
```

---

## 🛠️ Setup Lingkungan Pengembangan

### 📋 Prerequisites

```bash
# Node.js version check
node --version  # >= 18.0.0

# npm version check
npm --version   # >= 8.0.0

# Git version check
git --version   # >= 2.0.0
```

### 🚀 Installation Steps

```bash
# 1. Clone repository
git clone <repository-url>
cd digital-signage-bpr

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start development server
npm run dev
```

### 🌐 Environment Variables

```bash
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Database (future)
DATABASE_URL="postgresql://username:password@localhost:5432/digital_signage"
```

### 📜 Available Scripts

```json
{
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "db:push": "prisma db push",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts"
  }
}
```

---

## 🧩 Komponen Utama

### 📱 Main Display Component (`src/app/page.tsx`)

```typescript
interface Slide {
  id: string
  title: string
  subtitle: string
  description: string
  features: string[]
  backgroundColor: string
  textColor: string
  isActive: boolean
  order: number
  category: string
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

interface InterestRate {
  id: string
  type: string
  rate: string
  period: string
  isActive: boolean
  updatedAt: string
}

interface NewsItem {
  id: string
  title: string
  description: string
  category: 'news' | 'promo' | 'announcement'
  date: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface ExchangeRate {
  currency: string
  code: string
  buy: number
  sell: number
  change: number
  changePercent: number
}
```

#### 🔄 State Management

```typescript
export default function DigitalSignage() {
  // Core states
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activePromoIndex, setActivePromoIndex] = useState(0)
  
  // Data states
  const [slides, setSlides] = useState<Slide[]>([])
  const [rates, setRates] = useState<InterestRate[]>([])
  const [news, setNews] = useState<NewsItem[]>([])
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([])
  const [loading, setLoading] = useState(true)
}
```

#### 🎯 Key Features

1. **Auto-rotating Promos**
   ```typescript
   useEffect(() => {
     if (slides.length === 0) return
     
     const promoTimer = setInterval(() => {
       setActivePromoIndex((prev) => (prev + 1) % slides.length)
     }, 4000)
     return () => clearInterval(promoTimer)
   }, [slides.length])
   ```

2. **Real-time Data Fetching**
   ```typescript
   const fetchData = async () => {
     const [slidesRes, ratesRes, newsRes, exchangeRes] = await Promise.all([
       fetch('/api/slides'),
       fetch('/api/rates'),
       fetch('/api/news'),
       fetch('/api/exchange-rates')
     ])
     // Process responses...
   }
   ```

3. **Fullscreen Toggle**
   ```typescript
   const toggleFullscreen = () => {
     if (!document.fullscreenElement) {
       document.documentElement.requestFullscreen()
       setIsFullscreen(true)
     } else {
       document.exitFullscreen()
       setIsFullscreen(false)
     }
   }
   ```

### ⚙️ Admin Panel Component (`src/components/content-management.tsx`)

#### 📋 Features

- **Slide Management**: CRUD operations untuk promo slides
- **Interest Rates Management**: Update suku bunga
- **News Management**: Tambah/edit berita dan promo
- **Exchange Rates Management**: Kelola kurs mata uang
- **Real-time Preview**: Preview perubahan langsung

#### 🎨 UI Components Structure

```typescript
const SlideEditor = ({ slide, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Slide>(slide || defaultSlide)
  
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures })
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input value={formData.title} onChange={...} />
        <Input value={formData.subtitle} onChange={...} />
      </div>
      <Textarea value={formData.description} onChange={...} />
      {/* Additional fields... */}
    </div>
  )
}
```

---

## 🔌 API Endpoints

### 📊 Slide Management (`/api/slides`)

```typescript
// GET /api/slides
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: slides.filter(slide => slide.isActive)
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch slides' },
      { status: 500 }
    )
  }
}

// POST /api/slides
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newSlide = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    slides.push(newSlide)
    
    return NextResponse.json({
      success: true,
      data: newSlide
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create slide' },
      { status: 500 }
    )
  }
}
```

### 💰 Interest Rates (`/api/rates`)

```typescript
// GET /api/rates
export async function GET() {
  return NextResponse.json({
    success: true,
    data: rates.filter(rate => rate.isActive)
  })
}

// PUT /api/rates
export async function PUT(request: NextRequest) {
  const { id, ...updateData } = await request.json()
  const rateIndex = rates.findIndex(rate => rate.id === id)
  
  if (rateIndex === -1) {
    return NextResponse.json(
      { success: false, error: 'Rate not found' },
      { status: 404 }
    )
  }
  
  rates[rateIndex] = {
    ...rates[rateIndex],
    ...updateData,
    updatedAt: new Date().toISOString()
  }
  
  return NextResponse.json({
    success: true,
    data: rates[rateIndex]
  })
}
```

### 📰 News Management (`/api/news`)

```typescript
// GET /api/news
export async function GET() {
  return NextResponse.json({
    success: true,
    data: news
      .filter(item => item.isActive)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  })
}

// DELETE /api/news?id=<id>
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  if (!id) {
    return NextResponse.json(
      { success: false, error: 'News ID is required' },
      { status: 400 }
    )
  }
  
  const newsIndex = news.findIndex(item => item.id === id)
  if (newsIndex === -1) {
    return NextResponse.json(
      { success: false, error: 'News not found' },
      { status: 404 }
    )
  }
  
  const deletedNews = news[newsIndex]
  news.splice(newsIndex, 1)
  
  return NextResponse.json({
    success: true,
    data: deletedNews
  })
}
```

### 💱 Exchange Rates (`/api/exchange-rates`)

```typescript
interface ExchangeRate {
  id: string
  currency: string
  code: string
  buy: number
  sell: number
  change: number
  changePercent: number
  isActive: boolean
  updatedAt: string
}

// GET /api/exchange-rates
export async function GET() {
  return NextResponse.json({
    success: true,
    data: exchangeRates.filter(rate => rate.isActive)
  })
}
```

---

## 🔄 State Management

### 🎯 React Hooks Pattern

```typescript
// Custom hook untuk data fetching
const useApiData = <T>(url: string, initialData: T[] = []) => {
  const [data, setData] = useState<T[]>(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(url)
        const result = await response.json()
        
        if (result.success) {
          setData(result.data)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error, refetch: fetchData }
}
```

### 🔄 Auto-refresh Pattern

```typescript
// Auto-refresh setiap 30 detik
useEffect(() => {
  const interval = setInterval(() => {
    fetchData()
  }, 30000)
  return () => clearInterval(interval)
}, [])
```

### 🎛️ State Synchronization

```typescript
// Sync antara admin panel dan main display
const useRealtimeSync = () => {
  const [lastUpdate, setLastUpdate] = useState(Date.now())

  useEffect(() => {
    const checkUpdates = async () => {
      const response = await fetch('/api/last-update')
      const { timestamp } = await response.json()
      
      if (timestamp > lastUpdate) {
        // Trigger refresh
        window.location.reload()
      }
    }

    const interval = setInterval(checkUpdates, 5000)
    return () => clearInterval(interval)
  }, [lastUpdate])
}
```

---

## 🎨 Styling & UI

### 🎨 Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 🎯 Design System

```typescript
// Color palette untuk BPR theme
const bprTheme = {
  primary: {
    orange: 'from-orange-500 to-orange-600',
    blue: 'from-blue-900 to-blue-950',
    yellow: 'from-yellow-500 to-orange-500',
  },
  semantic: {
    success: 'text-green-400',
    warning: 'text-yellow-400',
    error: 'text-red-400',
    info: 'text-blue-400',
  },
  gradients: {
    promo: 'from-orange-500 to-orange-600',
    loan: 'from-orange-600 to-red-500',
    deposit: 'from-yellow-500 to-orange-500',
  }
}
```

### 📱 Responsive Design

```typescript
// Breakpoint system
const breakpoints = {
  sm: '640px',    // Small screens
  md: '768px',    // Medium screens
  lg: '1024px',   // Large screens
  xl: '1280px',   // Extra large screens
  '2xl': '1536px' // 2X large screens
}

// Responsive utilities
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Content */}
</div>
```

---

## 🎬 Animasi & Transisi

### 🎭 Framer Motion Setup

```typescript
import { motion, AnimatePresence } from 'framer-motion'

// Animation variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
}

// Usage dalam component
<AnimatePresence mode="wait">
  {slides.map((slide, index) => (
    index === activeSlide && (
      <motion.div
        key={slide.id}
        custom={1}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 }
        }}
      >
        {/* Slide content */}
      </motion.div>
    )
  ))}
</AnimatePresence>
```

### 🎯 Animation Patterns

1. **Page Transitions**
   ```typescript
   const pageVariants = {
     initial: { opacity: 0, y: 20 },
     animate: { opacity: 1, y: 0 },
     exit: { opacity: 0, y: -20 }
   }
   ```

2. **Stagger Animations**
   ```typescript
   const containerVariants = {
     hidden: { opacity: 0 },
     visible: {
       opacity: 1,
       transition: {
         duration: 0.6,
         staggerChildren: 0.1
       }
     }
   }
   ```

3. **Hover Effects**
   ```typescript
   <motion.div
     whileHover={{ scale: 1.05 }}
     whileTap={{ scale: 0.95 }}
     transition={{ type: "spring", stiffness: 400, damping: 17 }}
   >
     {/* Content */}
   </motion.div>
   ```

---

## 🗄️ Integrasi Database

### 📊 Prisma Setup (Future Implementation)

```prisma
// prisma/schema.prisma
generator client {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Slide {
  id          String   @id @default(cuid())
  title       String
  subtitle    String?
  description String
  features    String[]
  backgroundColor String
  textColor   String
  isActive    Boolean  @default(true)
  order       Int
  category    String
  imageUrl    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("slides")
}

model InterestRate {
  id        String   @id @default(cuid())
  type      String
  rate      String
  period    String
  isActive  Boolean  @default(true)
  updatedAt DateTime @updatedAt

  @@map("interest_rates")
}

model News {
  id          String   @id @default(cuid())
  title       String
  description String
  category    String
  date        String
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("news")
}

model ExchangeRate {
  id           String   @id @default(cuid())
  currency     String
  code         String
  buy          Float
  sell         Float
  change       Float
  changePercent Float
  isActive     Boolean  @default(true)
  updatedAt    DateTime @updatedAt

  @@map("exchange_rates")
}
```

### 🔌 Database Client

```typescript
// src/lib/db.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })
```

### 🔄 Migration Strategy

```bash
# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name init_database

# Apply to production
npx prisma migrate deploy

# Seed data
npx tsx prisma/seed.ts
```

---

## 🧪 Testing

### 📋 Test Structure

```
src/
├── __tests__/
│   ├── components/
│   │   ├── slide-editor.test.tsx
│   │   ├── promo-display.test.tsx
│   │   └── news-section.test.tsx
│   ├── api/
│   │   ├── slides.test.ts
│   │   ├── rates.test.ts
│   │   └── news.test.ts
│   └── utils/
│       └── date-formatters.test.ts
├── setup/
│   ├── jest.config.js
│   └── test-setup.ts
└── e2e/
    ├── signage-display.spec.ts
    └── admin-panel.spec.ts
```

### 🧪 Component Testing

```typescript
// __tests__/components/slide-editor.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SlideEditor } from '@/components/content-management'

describe('SlideEditor', () => {
  it('should render form fields correctly', () => {
    const mockOnSave = jest.fn()
    const mockOnCancel = jest.fn()
    
    render(
      <SlideEditor 
        onSave={mockOnSave} 
        onCancel={mockOnCancel} 
      />
    )
    
    expect(screen.getByLabelText('Judul Slide')).toBeInTheDocument()
    expect(screen.getByLabelText('Subtitle')).toBeInTheDocument()
    expect(screen.getByLabelText('Deskripsi')).toBeInTheDocument()
  })

  it('should handle form submission', async () => {
    const mockOnSave = jest.fn()
    
    render(<SlideEditor onSave={mockOnSave} />)
    
    fireEvent.change(screen.getByLabelText('Judul Slide'), {
      target: { value: 'Test Slide' }
    })
    
    fireEvent.click(screen.getByText('Simpan'))
    
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Test Slide' })
      )
    })
  })
})
```

### 🔌 API Testing

```typescript
// __tests__/api/slides.test.ts
import { createMocks } from 'node-mocks-http'
import { GET, POST } from '@/app/api/slides/route'

describe('/api/slides', () => {
  it('should return slides on GET', async () => {
    const { req, res } = createMocks({ method: 'GET' })
    
    await GET(req, res)
    
    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.success).toBe(true)
    expect(Array.isArray(data.data)).toBe(true)
  })

  it('should create slide on POST', async () => {
    const slideData = {
      title: 'Test Slide',
      subtitle: 'Test Subtitle',
      description: 'Test Description',
      features: ['Feature 1', 'Feature 2'],
      backgroundColor: 'from-orange-500 to-orange-600',
      textColor: 'text-white',
      isActive: true,
      order: 1,
      category: 'Promo'
    }
    
    const { req, res } = createMocks({
      method: 'POST',
      body: slideData
    })
    
    await POST(req, res)
    
    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(data.success).toBe(true)
    expect(data.data.title).toBe('Test Slide')
  })
})
```

### 🎭 E2E Testing

```typescript
// e2e/signage-display.spec.ts
import { test, expect } from '@playwright/test'

test('should display promo slides', async ({ page }) => {
  await page.goto('http://localhost:3000')
  
  // Check if promo section is visible
  await expect(page.locator('[data-testid="promo-section"]')).toBeVisible()
  
  // Check if slides auto-rotate
  const firstSlide = page.locator('[data-testid="slide-0"]')
  await expect(firstSlide).toBeVisible()
  
  // Wait for next slide
  await page.waitForTimeout(5000)
  const secondSlide = page.locator('[data-testid="slide-1"]')
  await expect(secondSlide).toBeVisible()
})

test('should display exchange rates', async ({ page }) => {
  await page.goto('http://localhost:3000')
  
  await expect(page.locator('[data-testid="exchange-rates"]')).toBeVisible()
  await expect(page.locator('text=USD')).toBeVisible()
  await expect(page.locator('text=SGD')).toBeVisible()
})
```

---

## 🚀 Deployment

### 🐳 Docker Setup

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --group next && \
    adduser --system --group next

COPY --from=builder /app/public ./public
COPY --from=builder --chown=next:next /app/.next/standalone ./
COPY --from=builder --chown=next:next /app/.next/static ./

USER next

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/digital_signage
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=digital_signage
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### ☁️ Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod

# Environment variables in Vercel dashboard
# - DATABASE_URL
# - NEXT_PUBLIC_APP_URL
```

### 🐳 Self-hosted Deployment

```bash
# Build for production
npm run build

# Start production server
npm start

# Or with PM2
pm2 start npm --name "digital-signage" -- start
```

### 🔧 Nginx Configuration

```nginx
# /etc/nginx/sites-available/digital-signage
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔧 Troubleshooting

### 🐛 Common Issues & Solutions

#### 1. **Build Errors**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check
```

#### 2. **API Issues**
```bash
# Check API endpoints
curl -X GET http://localhost:3000/api/slides
curl -X POST http://localhost:3000/api/slides \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test"}'
```

#### 3. **Styling Issues**
```bash
# Check Tailwind compilation
npm run build

# Verify Tailwind config
npx tailwindcss --help
```

#### 4. **Performance Issues**
```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Check performance
npm run start
# Open Chrome DevTools -> Performance tab
```

### 🔍 Debug Tools

```typescript
// Debug component state
useEffect(() => {
  console.log('Slides:', slides)
  console.log('Active Index:', activePromoIndex)
}, [slides, activePromoIndex])

// Debug API calls
const fetchData = async () => {
  try {
    console.log('Fetching data...')
    const response = await fetch('/api/slides')
    console.log('Response status:', response.status)
    const data = await response.json()
    console.log('Response data:', data)
  } catch (error) {
    console.error('Fetch error:', error)
  }
}
```

### 📱 Mobile Debugging

```bash
# Test on mobile devices
npm run dev

# Access with different devices
# http://localhost:3000 (mobile view)
# Chrome DevTools -> Toggle device toolbar
```

---

## 📚 Best Practices

### 🎯 Code Organization

1. **Component Structure**
   ```typescript
   // Good: Clear separation of concerns
   const PromoSection = () => {
     // Logic and UI together
   }
   
   // Bad: Mixed responsibilities
   const Component = () => {
     // API calls + UI + state management
   }
   ```

2. **Type Safety**
   ```typescript
   // Good: Explicit types
   interface Slide {
     id: string
     title: string
     subtitle: string
   }
   
   // Bad: Using any
   const slide: any = { /* ... */ }
   ```

3. **Error Handling**
   ```typescript
   // Good: Proper error handling
   const fetchData = async () => {
     try {
       const response = await fetch(url)
       if (!response.ok) throw new Error('Network error')
       return await response.json()
     } catch (error) {
       console.error('Fetch failed:', error)
       throw error
     }
   }
   ```

### 🎨 UI/UX Best Practices

1. **Loading States**
   ```typescript
   {loading ? (
     <LoadingSpinner />
   ) : (
     <DataDisplay />
   )}
   ```

2. **Error Boundaries**
   ```typescript
   <ErrorBoundary fallback={<ErrorMessage />}>
     <App />
   </ErrorBoundary>
   ```

3. **Accessibility**
   ```typescript
   // Semantic HTML
   <main role="main">
     <header>
       <h1>Bank Perekonomian Rakyat</h1>
     </header>
     <section aria-label="Promotions">
       {/* Content */}
     </section>
   </main>
   ```

### 🚀 Performance Best Practices

1. **Code Splitting**
   ```typescript
   // Dynamic imports for large components
   const AdminPanel = dynamic(() => import('./admin-panel'), {
     loading: () => <LoadingSpinner />
   })
   ```

2. **Image Optimization**
   ```typescript
   // Next.js Image component
   import Image from 'next/image'
   
   <Image
     src="/logo.png"
     alt="Bank Logo"
     width={120}
     height={120}
     priority
   />
   ```

3. **Memoization**
   ```typescript
   // React.memo for expensive components
   const ExpensiveComponent = React.memo(({ data }) => {
     return <div>{/* Complex rendering */}</div>
   })
   ```

### 🔒 Security Best Practices

1. **Input Validation**
   ```typescript
   // Validate API inputs
   const validateSlide = (slide: Partial<Slide>) => {
     if (!slide.title || slide.title.length < 3) {
       throw new Error('Title is required and must be at least 3 characters')
     }
     return true
   }
   ```

2. **Rate Limiting**
   ```typescript
   // Simple rate limiting
   const rateLimit = new Map()
   
   export async function POST(request: NextRequest) {
     const ip = request.ip || 'unknown'
     const now = Date.now()
     const windowStart = rateLimit.get(ip) || 0
     
     if (now - windowStart < 60000) { // 1 minute window
       return NextResponse.json(
         { error: 'Too many requests' },
         { status: 429 }
       )
     }
     
     rateLimit.set(ip, now)
     // Process request...
   }
   ```

---

## 📖 Referensi & Resources

### 📚 Dokumentasi Resmi

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### 🛠️ Development Tools

- [VS Code Extensions](https://marketplace.visualstudio.com/)
  - Tailwind CSS IntelliSense
  - TypeScript Importer
  - Prettier - Code formatter
  - ESLint

### 🎨 Design Resources

- [Tailwind UI Components](https://tailwindui.com/)
- [Lucide Icons](https://lucide.dev/)
- [Coolors Color Palette](https://coolors.co/)
- [Google Fonts](https://fonts.google.com/)

### 📱 Testing Tools

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [Playwright Documentation](https://playwright.dev/)

---

## 🤝 Kontribusi

### 📋 Guidelines Kontribusi

1. **Fork Repository**
   ```bash
   git clone https://github.com/username/digital-signage-bpr.git
   cd digital-signage-bpr
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow coding standards
   - Add tests untuk fitur baru
   - Update dokumentasi

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push & Pull Request**
   ```bash
   git push origin feature/your-feature-name
   # Create PR di GitHub
   ```

### 📝 Commit Message Convention

```
feat: new feature
fix: bug fix
docs: documentation update
style: formatting, missing semi colons, etc.
refactor: code refactoring
test: adding tests
chore: maintenance
```

---

## 📞 Support & Kontak

### 🆘 Bantuan Teknis

- **Email**: support@bpr.co.id
- **Phone**: 1500-888
- **Documentation**: [Wiki Project](https://github.com/username/digital-signage-bpr/wiki)
- **Issues**: [GitHub Issues](https://github.com/username/digital-signage-bpr/issues)

### 📋 Reporting Issues

Saat melaporkan issue, sertakan:

1. **Environment Info**
   - OS dan versi
   - Node.js versi
   - Browser versi

2. **Steps to Reproduce**
   - Langkah-langkah detail
   - Expected vs actual behavior

3. **Error Messages**
   - Console logs
   - Error screenshots

4. **Additional Context**
   - Kapan issue terjadi
   - Apakah issue konsisten

---

## 📄 License

Project ini dilisensikan under [MIT License](LICENSE).

### 📜 Hak Cipta

Copyright (c) 2024 Bank Perekonomian Rakyat

---

**Digital Signage BPR** - Solusi modern untuk kebutuhan display informasi perbankan 🏦

*Dokumentasi ini akan terus diperbarui seiring dengan perkembangan proyek.*