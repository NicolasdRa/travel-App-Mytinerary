import { useState, useCallback } from 'react'
import { FavouritesService } from '../services'
import { favouritesUrl } from '../constants'

interface UseFavoriteProps {
  sourceType: 'city' | 'itinerary' | 'activity'
  sourceId: string
  userId: string | undefined
  initialFavorite?: any
  initialCount?: number
}

export const useFavorite = ({
  sourceType,
  sourceId,
  userId,
  initialFavorite = null,
  initialCount = 0
}: UseFavoriteProps) => {
  const [favourite, setFavourite] = useState(initialFavorite)
  const [count, setCount] = useState(initialCount)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addFavourite = useCallback(async () => {
    if (!userId || isProcessing) return

    setIsProcessing(true)
    setError(null)

    try {
      const response = await FavouritesService.addFavourite({
        [sourceType]: sourceId,
        user: userId,
      })
      
      setFavourite(response.data.data)
      setCount(prev => prev + 1)
      return { success: true, data: response.data.data }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to add favourite'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsProcessing(false)
    }
  }, [sourceType, sourceId, userId, isProcessing])

  const removeFavourite = useCallback(async () => {
    if (!favourite || isProcessing) return

    setIsProcessing(true)
    setError(null)
    
    // Store original values for rollback
    const originalFavourite = favourite
    const originalCount = count
    
    // Optimistic update
    setFavourite(null)
    setCount(prev => prev - 1)

    try {
      await FavouritesService.removeFavourite(originalFavourite._id)
      
      return { success: true }
    } catch (error: any) {
      // Rollback on error
      setFavourite(originalFavourite)
      setCount(originalCount)
      
      const errorMessage = error.response?.data?.message || 'Failed to remove favourite'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsProcessing(false)
    }
  }, [favourite, count, isProcessing])

  const toggleFavourite = useCallback(() => {
    if (favourite) {
      return removeFavourite()
    } else {
      return addFavourite()
    }
  }, [favourite, addFavourite, removeFavourite])

  return {
    favourite,
    count,
    isProcessing,
    error,
    isFavorited: !!favourite,
    addFavourite,
    removeFavourite,
    toggleFavourite
  }
}