import React from 'react'
import 'typeface-roboto'
import CityCard from './CityCard'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  gallery: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: '3rem'
  }
}))

const CityGallery = props => {
  const classes = useStyles()
  const { cities } = props

  return (
    <div className={classes.gallery}>
      {cities.map(city => (
        <CityCard city={city} key={city._id} />
      ))}
    </div>
  )
}

export default CityGallery
