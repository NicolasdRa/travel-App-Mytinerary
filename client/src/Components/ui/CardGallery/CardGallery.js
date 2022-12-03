import React from 'react'
import PropTypes from 'prop-types'

import { Typography } from '@mui/material'

import { CustomCard } from '../CustomCard/CustomCard'
import { useStyles } from './styles'

export const CardGallery = ({ data, type }) => {
  const classes = useStyles()

  if (data.length > 0) {
    return (
      <div className={classes.gallery}>
        {data.map((item) => (
          <CustomCard data={item} type={type} key={item._id} />
        ))}
      </div>
    )
  } else {
    return (
      <Typography style={{ margin: '1rem 0 .5rem 1rem', textAlign: 'center' }}>
        No {type} found.
      </Typography>
    )
  }
}

CardGallery.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
}
