import React, { useState, useEffect, memo } from 'react'
import axios from 'axios'

import { IconButton, Typography } from '@mui/material'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'

import { useFetchData } from '../../../hooks/useFetchData'
import { favouritesUrl, apiUrl } from '../../../constants'
import { StyledContainer } from './styles'

interface FavouriteComponentProps {
  readOnly?: boolean
  sourceType: 'city' | 'itinerary' | 'activity'
  sourceId: string
  userId: string | undefined
  amount?: number
}

const FavouriteComponentComponent: React.FC<FavouriteComponentProps> = ({
  readOnly,
  sourceType,
  sourceId,
  userId,
  amount,
}) => {
  const [count, setCount] = useState(0)
  const [favourite, setFavourite] = useState(null)
  const [iconColour, setIconColour] = useState('default')
  const [isProcessing, setIsProcessing] = useState(false)

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
  const { data: favourites, isLoading, isError } = useFetchData(url, {})

  // fills count with DB data
  useEffect(() => {
    setCount(favourites.data && favourites.data.length)
  }, [favourites])

  useEffect(() => {
    if (favourites.data && favourites.data.length > 0) {
      const isfavourite = favourites.data.filter(
        (favourite: { user: { id: string } }) => favourite.user.id === userId
      )
      setFavourite(isfavourite[0])
    }
  }, [favourites, userId])

  useEffect(() => {
    favourite && setIconColour('secondary')
  }, [favourite])

  const addFavourite = async () => {
    if (!favourite && !isProcessing) {
      setIsProcessing(true)
      try {
        const res = await axios({
          method: 'POST',
          url: favouritesUrl,
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            [sourceType]: sourceId,
            user: userId,
          },
          withCredentials: true,
        })
        setIconColour('secondary')
        setCount(count + 1)
        setFavourite(res.data.data.data)
      } catch (error) {
        // Revert optimistic update on error
        console.error('Failed to add favourite:', error)
        // Could show a toast notification here
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const removeFavourite = async () => {
    if (favourite && !isProcessing) {
      setIsProcessing(true)
      const originalFavourite = favourite
      const originalCount = count
      
      // Optimistic update
      setFavourite(null)
      setIconColour('default')
      setCount(count - 1)

      try {
        const res = await axios({
          method: 'DELETE',
          url: `${favouritesUrl}${originalFavourite['_id']}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        return res
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
    if (isProcessing) return // Prevent multiple clicks while processing
    
    if (favourite === null) {
      addFavourite()
    } else {
      removeFavourite()
    }
  }

  return (
    <StyledContainer>
      <IconButton
        aria-label="add to favorites"
        onClick={handleClick}
        color="inherit"
        className="likes_btn"
      >
        <FavoriteBorderRoundedIcon className="likes_icon" />
      </IconButton>
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        className="text"
      >
        {count}
      </Typography>
    </StyledContainer>
  )
}

export const FavouriteComponent = memo(FavouriteComponentComponent)
