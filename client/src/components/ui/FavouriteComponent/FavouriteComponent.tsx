import React, { useState, useEffect, memo } from 'react'
import { FavouritesService } from '../../../services'

import { IconButton, Typography, Snackbar, Alert } from '@mui/material'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'

import { useFetchData } from '../../../hooks/useFetchData'
import { favouritesUrl, apiUrl } from '../../../constants'
import { StyledContainer } from './styles'

interface FavouriteItem {
  _id: string
  user: string | { _id: string; userName?: string }
  city?: string
  itinerary?: string
  activity?: string
  createdAt: string
}

interface FavouritesResponse {
  status: string
  results: number
  data: FavouriteItem[]
}

interface FavouriteComponentProps {
  readOnly?: boolean
  sourceType: 'city' | 'itinerary' | 'activity'
  sourceId: string
  userId: string | null
  amount?: number
}

const FavouriteComponentComponent: React.FC<FavouriteComponentProps> = ({
  readOnly,
  sourceType,
  sourceId,
  userId,
  amount,
}) => {
  const [count, setCount] = useState(amount || 0)
  const [favourite, setFavourite] = useState<FavouriteItem | null>(null)
  const [iconColour, setIconColour] = useState<'default' | 'secondary'>('default')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showLoginToast, setShowLoginToast] = useState(false)

  // TODO: replace switch with object
  const getUrlPart = (sourceType: 'city' | 'itinerary' | 'activity') => {
    const urlPart = {
      city: 'cities',
      itinerary: 'itineraries',
      activity: 'activities',
    }

    return urlPart[sourceType]
  }

  // Don't make API calls if sourceId is undefined
  const url = sourceId ? `${apiUrl}${getUrlPart(sourceType)}/${sourceId}/favourites` : null

  // fetches data only if URL is valid
  const { data: favourites, isLoading, isError } = useFetchData<FavouritesResponse>(url, {})

  // fills count with DB data
  useEffect(() => {
    // Only update count if we have valid data
    if (favourites && favourites.data && Array.isArray(favourites.data)) {
      setCount(favourites.data.length)
    } else if (favourites && favourites.data === null) {
      // If data is explicitly null (no favourites), set count to 0
      setCount(0)
    } else if (favourites && Array.isArray(favourites)) {
      // Handle case where favourites is directly the array
      setCount(favourites.length)
    } else if (favourites && typeof favourites.results === 'number') {
      // Use results field if available
      setCount(favourites.results)
    } else if (!isLoading && !isError) {
      // Only set to 0 if we're not loading and there's no error
      setCount(0)
    }
    // If loading or error, keep the current count (don't show NaN)
  }, [favourites, isLoading, isError, userId])

  useEffect(() => {
    // Don't process favorites if userId is null (during loading)
    if (!userId) {
      return
    }
    
    if (favourites && favourites.data && Array.isArray(favourites.data) && favourites.data.length > 0) {
      const isfavourite = favourites.data.filter(
        (favourite: any) => {
          // Handle both populated and non-populated user fields
          const favUserId = favourite.user?._id || favourite.user?.id || favourite.user
          return favUserId === userId
        }
      )
      
      setFavourite(isfavourite[0] || null)
    } else {
      setFavourite(null)
    }
  }, [favourites, userId])

  useEffect(() => {
    if (favourite) {
      setIconColour('secondary')
    } else {
      setIconColour('default')
    }
  }, [favourite])

  const addFavourite = async () => {
    if (!favourite && !isProcessing && userId) {
      setIsProcessing(true)
      try {
        const response = await FavouritesService.addFavourite({
          [sourceType]: sourceId,
          user: userId,
        })
        setIconColour('secondary')
        setCount(count + 1)
        // FavouritesService already returns response.data, server has nested structure
        setFavourite(response.data?.data || response.data)
      } catch (error: any) {
        // Handle duplicate error
        if (error.message?.includes('duplicate') || error.message?.includes('E11000')) {
          // Refresh the favorites data to get current state
          window.location.reload()
        } else {
          console.error('Failed to add favourite:', error)
        }
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const removeFavourite = async () => {
    if (favourite && !isProcessing && userId) {
      setIsProcessing(true)
      const originalFavourite = favourite
      const originalCount = count
      
      // Optimistic update
      setFavourite(null)
      setIconColour('default')
      setCount(count - 1)

      try {
        const response = await FavouritesService.removeFavourite(originalFavourite['_id'])
        return response
      } catch (error) {
        // Revert optimistic update on error
        setFavourite(originalFavourite)
        setIconColour('secondary')
        setCount(originalCount)
        console.error('Failed to remove favourite:', error)
        // Could show a toast notification here
      } finally {
        setIsProcessing(false)
      }
    }
  }

  // toggles favourite btn action
  const handleClick = () => {
    if (isProcessing) return // Prevent clicks while processing
    
    // Show login toast if user is not authenticated
    if (!userId) {
      setShowLoginToast(true)
      return
    }
    
    if (favourite === null) {
      addFavourite()
    } else {
      removeFavourite()
    }
  }

  const handleCloseLoginToast = () => {
    setShowLoginToast(false)
  }

  return (
    <StyledContainer>
      <IconButton
        aria-label="add to favorites"
        onClick={handleClick}
        color={iconColour}
        className="likes_btn"
        disabled={isProcessing}
      >
        {favourite ? (
          <FavoriteRoundedIcon className="likes_icon" />
        ) : (
          <FavoriteBorderRoundedIcon className="likes_icon" />
        )}
      </IconButton>
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        className="text"
      >
        {Number.isNaN(count) ? 0 : count}
      </Typography>

      {/* Login Toast */}
      <Snackbar
        open={showLoginToast}
        autoHideDuration={4000}
        onClose={handleCloseLoginToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseLoginToast} 
          severity="info" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          Please log in to favorite items
        </Alert>
      </Snackbar>
    </StyledContainer>
  )
}

export const FavouriteComponent = memo(FavouriteComponentComponent)
