import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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

const poster = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.error?.issues || 'Failed to create data')
  }
  return result.data
}

const putter = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.error?.issues || 'Failed to update data')
  }
  return result.data
}

const deleter = async (url: string) => {
  const response = await fetch(url, {
    method: 'DELETE',
  })
  const result = await response.json()
  if (!result.success) {
    throw new Error(result.error || 'Failed to delete data')
  }
  return result.data
}

export function useContentManagementData() {
  const queryClient = useQueryClient()
  const { emit } = useSocket({
    url: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001',
  })

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

  const createMutation = (queryKey: string, url: string, eventName: string) => {
    return useMutation({
      mutationFn: (data: any) => poster(url, data),
      onSuccess: (newData) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] })
        emit(`${eventName}_created`, newData)
      },
    })
  }

  const updateMutation = (queryKey: string, url: string, eventName: string) => {
    return useMutation({
      mutationFn: (data: any) => putter(url, data),
      onSuccess: (updatedData) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] })
        emit(`${eventName}_updated`, updatedData)
      },
    })
  }

  const deleteMutation = (queryKey: string, url: string, eventName: string) => {
    return useMutation({
      mutationFn: (id: string) => deleter(`${url}?id=${id}`),
      onSuccess: (deletedData) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] })
        emit(`${eventName}_deleted`, deletedData.id)
      },
    })
  }
  
  const toggleMutation = (queryKey: string, url: string, eventName: string) => {
    return useMutation({
      mutationFn: (data: any) => putter(url, { ...data, isActive: !data.isActive }),
      onSuccess: (updatedData) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] })
        emit(`${eventName}_updated`, updatedData)
      },
    })
  }

  const slideCreateMutation = createMutation('slides', '/api/slides', 'slide')
  const slideUpdateMutation = updateMutation('slides', '/api/slides', 'slide')
  const slideDeleteMutation = deleteMutation('slides', '/api/slides', 'slide')
  const slideToggleMutation = toggleMutation('slides', '/api/slides', 'slide')

  const rateCreateMutation = createMutation('rates', '/api/rates', 'rate')
  const rateUpdateMutation = updateMutation('rates', '/api/rates', 'rate')
  const rateDeleteMutation = deleteMutation('rates', '/api/rates', 'rate')
  const rateToggleMutation = toggleMutation('rates', '/api/rates', 'rate')

  const newsCreateMutation = createMutation('news', '/api/news', 'news')
  const newsUpdateMutation = updateMutation('news', '/api/news', 'news')
  const newsDeleteMutation = deleteMutation('news', '/api/news', 'news')
  const newsToggleMutation = toggleMutation('news', '/api/news', 'news')

  const exchangeRateCreateMutation = createMutation('exchange-rates', '/api/exchange-rates', 'exchange_rate')
  const exchangeRateUpdateMutation = updateMutation('exchange-rates', '/api/exchange-rates', 'exchange_rate')
  const exchangeRateDeleteMutation = deleteMutation('exchange-rates', '/api/exchange-rates', 'exchange_rate')
  const exchangeRateToggleMutation = toggleMutation('exchange-rates', '/api/exchange-rates', 'exchange_rate')

  const handleSave = (createMutation: any, updateMutation: any) => (data: any) => {
    if (data.id) {
      updateMutation.mutate(data)
    } else {
      createMutation.mutate(data)
    }
  }

  const handleToggle = (mutation: any, data: any) => (id: string) => {
    const item = data.find((d: any) => d.id === id)
    if (item) {
      mutation.mutate(item)
    }
  }

  return {
    slides,
    rates,
    news,
    exchangeRates,
    isLoading: slidesLoading || ratesLoading || newsLoading || exchangeRatesLoading,
    
    saveSlide: handleSave(slideCreateMutation, slideUpdateMutation),
    deleteSlide: slideDeleteMutation.mutate,
    toggleSlide: handleToggle(slideToggleMutation, slides),

    saveRate: handleSave(rateCreateMutation, rateUpdateMutation),
    deleteRate: rateDeleteMutation.mutate,
    toggleRate: handleToggle(rateToggleMutation, rates),

    saveNews: handleSave(newsCreateMutation, newsUpdateMutation),
    deleteNews: newsDeleteMutation.mutate,
    toggleNews: handleToggle(newsToggleMutation, news),

    saveExchangeRate: handleSave(exchangeRateCreateMutation, exchangeRateUpdateMutation),
    deleteExchangeRate: exchangeRateDeleteMutation.mutate,
    toggleExchangeRate: handleToggle(exchangeRateToggleMutation, exchangeRates),
  }
}
