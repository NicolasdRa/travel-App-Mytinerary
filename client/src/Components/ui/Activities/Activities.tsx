import { useState, useEffect } from 'react'

import {
  Grid,
  CircularProgress,
  TextField,
  Typography,
  Paper,
} from '@mui/material'

import { CardGallery } from '../CardGallery/CardGallery'
import ListingHeader from '../Headers/ListingHeader'

import { randomNumberGenerator } from '../../utils/utils'
import { selectAllActivities } from '../../Redux/activitiesSlice'
import { useAppSelector } from '../../Redux/hooks'
import { Activity } from '../../../@types/types'
import { StyledGrid, StyledLoaderGrid } from './styles'

const Activities = () => {
  const activities = useAppSelector(selectAllActivities)

  const [string, setString] = useState('')
  const [headerActivity, setHeaderActivity] = useState<Activity | null>(null)
  const [filteredActivities, setFilteredActivities] = useState<
    Activity[] | null
  >(null)

  useEffect(() => {
    // random cover image
    const randomNumber = randomNumberGenerator(0, activities.length - 1)

    filteredActivities === null
      ? setHeaderActivity(activities[randomNumber])
      : setHeaderActivity(activities[0])
  }, [activities, filteredActivities])

  useEffect(() => {
    // itinerary filter
    if (string !== '') {
      const filtered: Activity[] = activities.filter((activity) =>
        activity.city.toLowerCase().startsWith(string)
      )
      setFilteredActivities(filtered)
    }
    // clean up: when string is empty
    return () => {
      setFilteredActivities(null)
    }
  }, [activities, string])

  // updates string in state
  const handleChange = (e: any) => {
    setString(e.target.value.toLowerCase())
  }

  if (!activities) {
    return (
      <StyledLoaderGrid
        container
        direction="column"
        justifyContent="center"
        alignContent="center"
      >
        <Typography>Loading activities...</Typography>
        <CircularProgress color="secondary" />
      </StyledLoaderGrid>
    )
  }

  return (
    <StyledGrid container direction="column" alignItems="center">
      <Grid item xs={12} container direction="column" justifyContent="center">
        {headerActivity ? (
          <ListingHeader data={headerActivity} className="header" />
        ) : null}
        <Paper elevation={2} variant="outlined" className="searchbarContainer">
          <Typography className="searchBarTitle">Want to have fun?</Typography>

          <TextField
            id="outlined-helperText"
            label="Search activities by City Name.."
            defaultValue=""
            variant="outlined"
            onChange={handleChange}
            color="primary"
            className="searchBar"
          />
        </Paper>
      </Grid>
      <Grid item xs={12} lg={12}>
        <Typography variant="subtitle2" className="subtitle">
          {string === '' ? 'Most popular Activities' : 'Search results'}
        </Typography>
      </Grid>
      <Grid item xs={12} lg={12}>
        <CardGallery
          data={filteredActivities ? filteredActivities : activities}
          type="activities"
        />
      </Grid>
    </StyledGrid>
  )
}

export default Activities
