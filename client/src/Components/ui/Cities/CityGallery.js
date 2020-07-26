import React from 'react'
import 'typeface-roboto'
import CityCard from './CityCard'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  gallery: {
    // display: 'flex',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // margin: '0 1rem 3rem 1rem',

    position: 'relative',
    display: 'flex',
    flex: '0 1 auto',
    flexDirection: 'row',
    width: 'auto',
    overflowX: 'auto'

    // [theme.breakpoints.up('sm')]: {
    //   margin: '1rem 3rem'
    // },

    // [theme.breakpoints.up('md')]: {
    //   margin: '1rem 5rem'
    // }

    // [theme.breakpoints.up('lg')]: {
    //   width: '30em'
    // }
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
