import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { IconButton, Typography } from '@mui/material'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'

import { useStyles } from './styles'
import { useFetchData } from '../../../hooks/useFetchData'
import { favouritesUrl, apiUrl } from '../../../constants'

const Favourite = ({ readOnly, sourceType, sourceId, userId }) => {
  const classes = useStyles()

  // TODO: replace switch with object
  const urlPart = (sourceType) => {
    switch (sourceType) {
      case 'city':
        return 'cities'
      case 'itinerary':
        return 'itineraries'
      case 'activity':
        return 'activities'

      default:
        return null
    }
  }

  const [count, setCount] = useState(0)
  const [favourite, setFavourite] = useState(null)
  const [iconColour, setIconColour] = useState('default')

  const url = `${apiUrl}${urlPart(sourceType)}/${sourceId}/favourites`

  // fetches data
  const [{ data: favourites, isLoading, isError }] = useFetchData(url, {})

  // fills count with DB data
  useEffect(() => {
    setCount(favourites.data && favourites.data.length)
  }, [favourites])

  useEffect(() => {
    if (favourites.data && favourites.data.length > 0) {
      const isfavourite = favourites.data.filter(
        (favourite) => favourite.user.id === userId
      )
      setFavourite(isfavourite[0])
    }
  }, [favourites])

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
        })
        setIconColour('secondary')
        setCount(count + 1)
        setFavourite(res.data.data.data)
      } catch (error) {
        console.log(error.response)
      }
    }
  }

  const removeFavourite = async () => {
    if (favourite) {
      console.log(favourite._id)

      try {
        const res = await axios({
          method: 'DELETE',
          url: `${favouritesUrl}${favourite._id}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        setFavourite(null)
        setIconColour('default')
        setCount(count - 1)
        return res
      } catch (error) {
        console.log(error.response)
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
    <div className={classes.likes_container}>
      <IconButton
        aria-label="add to favorites"
        onClick={handleClick}
        color={iconColour}
        className={classes.likes_btn}
      >
        <FavoriteBorderRoundedIcon className={classes.likes_icon} />
      </IconButton>
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        className={classes.text}
      >
        {count}
      </Typography>
    </div>
  )
}

export default Favourite
