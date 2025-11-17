import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSocket } from './useSocket'
import { Slide, InterestRate, News, ExchangeRate } from '@/lib/types'

const fetcher = async (url: string) => {
  const response = await fetch(url)
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch data')
  }
  return result.data
}

export function useDigitalSignageData() {
  const queryClient = useQueryClient()

  const { data: slides = [], isLoading: slidesLoading } = useQuery<Slide[]>({
    queryKey: ['slides'],
    queryFn: () => fetcher('/api/slides'),
  })

  const { data: rates = [], isLoading: ratesLoading } = useQuery<InterestRate[]>({
    queryKey: ['rates'],
    queryFn: () => fetcher('/api/rates'),
  })

  const { data: news = [], isLoading: newsLoading } = useQuery<News[]>({
    queryKey: ['news'],
    queryFn: () => fetcher('/api/news'),
  })

  const { data: exchangeRates = [], isLoading: exchangeRatesLoading } = useQuery<ExchangeRate[]>({
    queryKey: ['exchange-rates'],
    queryFn: () => fetcher('/api/exchange-rates'),
  })

  const { socket, isConnected } = useSocket({
    url: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001',
    onConnect: () => console.log('Socket connected'),
    onDisconnect: () => console.log('Socket disconnected'),
    onError: (error) => console.error('Socket error:', error)
  })

  useEffect(() => {
    if (!socket) return

    const updateQueryData = (queryKey: string, updatedData: any, idField: string = 'id') => {
      queryClient.setQueryData<any[]>([queryKey], (oldData) => 
        oldData?.map((item) => (item[idField] === updatedData[idField] ? updatedData : item))
      )
    }

    const createQueryData = (queryKey: string, newData: any) => {
      queryClient.setQueryData<any[]>([queryKey], (oldData) =>
        oldData ? [...oldData, newData] : [newData]
      )
    }

    const deleteQueryData = (queryKey: string, id: string, idField: string = 'id') => {
      queryClient.setQueryData<any[]>([queryKey], (oldData) =>
        oldData?.filter((item) => item[idField] !== id)
      )
    }

    socket.on('slide_updated', (data: Slide) => updateQueryData('slides', data))
    socket.on('slide_created', (data: Slide) => createQueryData('slides', data))
    socket.on('slide_deleted', (id: string) => deleteQueryData('slides', id))

    socket.on('rate_updated', (data: InterestRate) => updateQueryData('rates', data))
    socket.on('rate_created', (data: InterestRate) => createQueryData('rates', data))
    socket.on('rate_deleted', (id: string) => deleteQueryData('rates', id))

    socket.on('news_updated', (data: News) => updateQueryData('news', data))
    socket.on('news_created', (data: News) => createQueryData('news', data))
    socket.on('news_deleted', (id: string) => deleteQueryData('news', id))

    socket.on('exchange_rate_updated', (data: ExchangeRate) => updateQueryData('exchange-rates', data))
    socket.on('exchange_rate_created', (data: ExchangeRate) => createQueryData('exchange-rates', data))
    socket.on('exchange_rate_deleted', (id: string) => deleteQueryData('exchange-rates', id))

    return () => {
      socket.off('slide_updated')
      socket.off('slide_created')
      socket.off('slide_deleted')
      socket.off('rate_updated')
      socket.off('rate_created')
      socket.off('rate_deleted')
      socket.off('news_updated')
      socket.off('news_created')
      socket.off('news_deleted')
      socket.off('exchange_rate_updated')
      socket.off('exchange_rate_created')
      socket.off('exchange_rate_deleted')
    }
  }, [socket, queryClient])

  return {
    slides,
    rates,
    news,
    exchangeRates,
    isLoading: slidesLoading || ratesLoading || newsLoading || exchangeRatesLoading,
    isConnected,
  }
}
