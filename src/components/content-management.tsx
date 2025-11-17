'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Eye } from 'lucide-react'
import { useContentManagementData } from '@/hooks/useContentManagementData'
import { LoadingSpinner } from '@/components/digital-signage/LoadingSpinner'
import { SlideManager } from './content-management/SlideManager'
import { RateManager } from './content-management/RateManager'
import { NewsManager } from './content-management/NewsManager'
import { ExchangeRateManager } from './content-management/ExchangeRateManager'

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState('slides')
  const { 
    slides, rates, news, exchangeRates, isLoading,
    saveSlide, deleteSlide, toggleSlide,
    saveRate, deleteRate, toggleRate,
    saveNews, deleteNews, toggleNews,
    saveExchangeRate, deleteExchangeRate, toggleExchangeRate
  } = useContentManagementData()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Manajemen Konten Digital Signage</h1>
              <p className="text-sm text-slate-600">Kelola slide, suku bunga, dan berita</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => window.open('/', '_blank')}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="slides">Slide Promosi</TabsTrigger>
            <TabsTrigger value="rates">Suku Bunga</TabsTrigger>
            <TabsTrigger value="news">Berita & Promo</TabsTrigger>
            <TabsTrigger value="exchange-rates">Kurs Mata Uang</TabsTrigger>
          </TabsList>

          <TabsContent value="slides">
            <SlideManager 
              slides={slides}
              onSave={saveSlide}
              onDelete={deleteSlide}
              onToggle={toggleSlide}
            />
          </TabsContent>
          <TabsContent value="rates">
            <RateManager
              rates={rates}
              onSave={saveRate}
              onDelete={deleteRate}
              onToggle={toggleRate}
            />
          </TabsContent>
          <TabsContent value="news">
            <NewsManager
              news={news}
              onSave={saveNews}
              onDelete={deleteNews}
              onToggle={toggleNews}
            />
          </TabsContent>
          <TabsContent value="exchange-rates">
            <ExchangeRateManager
              exchangeRates={exchangeRates}
              onSave={saveExchangeRate}
              onDelete={deleteExchangeRate}
              onToggle={toggleExchangeRate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
