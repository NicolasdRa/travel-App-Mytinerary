import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Box, IconButton, Typography } from '@material-ui/core'
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded'

import { addFavourite, deleteFavourite } from '../../Redux/favouritesSlice'

import { useStyles } from './styles'

const Favourite = ({ data, source }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const favouriteCount = useSelector((state) => state.favourites.results)

  // local state
  const [iconColour, setIconColour] = useState('default')
  const [count, setCount] = useState(data)

  // fills count with DB data
  useEffect(() => {
    setCount(favouriteCount)
  }, [favouriteCount])

  // Here dispatch action to add / remove favourite in DB

  // toggles favourite btn
  const handleClick = () => {
    const addOne = () => {
      setIconColour('secondary')
      setCount(count + 1)
      dispatch(addFavourite(source))
    }

    const removeOne = () => {
      setIconColour('default')
      setCount(count - 1)
      dispatch(deleteFavourite(source))
    }

    iconColour === 'default' ? addOne() : removeOne()
  }

  return (
    <Box className={classes.likes_container}>
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
    </Box>
  )
}

export default Favourite
