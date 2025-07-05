import React, { useState, useEffect } from 'react'
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

export const FavouriteComponent: React.FC<FavouriteComponentProps> = ({
  readOnly,
  sourceType,
  sourceId,
  userId,
  amount,
}) => {
  const [count, setCount] = useState(0)
  const [favourite, setFavourite] = useState(null)
  const [iconColour, setIconColour] = useState('default')

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
    if (!favourite) {
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
        error instanceof Error && console.log(error.message)
      }
    }
  }

  const removeFavourite = async () => {
    if (favourite) {
      console.log(favourite['._id'])

      try {
        const res = await axios({
          method: 'DELETE',
          url: `${favouritesUrl}${favourite['_id']}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        setFavourite(null)
        setIconColour('default')
        setCount(count - 1)
        return res
      } catch (error) {
        error instanceof Error && console.log(error.message)
      }
    }
  }

  // toggles favourite btn action
  const handleClick = () => {
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
