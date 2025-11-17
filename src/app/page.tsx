'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useDigitalSignageData } from '@/hooks/useDigitalSignageData'
import { LoadingSpinner } from '@/components/digital-signage/LoadingSpinner'
import { ConnectionStatus } from '@/components/digital-signage/ConnectionStatus'
import { Header } from '@/components/digital-signage/Header'
import { PromoSection } from '@/components/digital-signage/PromoSection'
import { InfoPanel } from '@/components/digital-signage/InfoPanel'

export default function DigitalSignage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { slides, rates, news, exchangeRates, isLoading, isConnected } = useDigitalSignageData()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Weather data (mock)
  const weather = {
    temperature: 28,
    condition: 'Cerah Berawan',
    humidity: 75,
    windSpeed: 12
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className={`min-h-screen bg-gray-100 ${isFullscreen ? 'p-0' : ''}`}>
      <ConnectionStatus isConnected={isConnected} />
      <Header 
        currentTime={currentTime}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />
      <motion.div
        className={`${isFullscreen ? 'p-4' : 'p-6'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
          <PromoSection slides={slides} />
          <InfoPanel 
            rates={rates}
            exchangeRates={exchangeRates}
            news={news}
            weather={weather}
          />
        </div>
      </motion.div>
    </div>
  )
}