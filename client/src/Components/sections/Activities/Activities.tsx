import { useState, useEffect } from 'react'

import { Grid, TextField, Typography, Paper } from '@mui/material'

import { CustomLoader } from '../../ui/CustomLoader/CustomLoader'
import { CardGallery } from '../../ui/CardGallery/CardGallery'
import { ListingHeader } from '../Headers/ListingHeader'

import {
  selectAllActivities,
  selectRandomActivity,
} from '../../../redux/activitiesSlice'
import { useAppSelector } from '../../../redux/hooks'
import { Activity } from '../../../@types/types'

import { StyledGrid } from './styles'

export const Activities = () => {
  const activities = useAppSelector(selectAllActivities)
  const headerActivity = useAppSelector(selectRandomActivity)

  const [string, setString] = useState('')

  const [filteredActivities, setFilteredActivities] = useState<
    Activity[] | null
  >(null)

  useEffect(() => {
    // itinerary filter
    if (string !== '') {
      const filtered: Activity[] = activities.filter((activity) =>
        activity.cityName.toLowerCase().startsWith(string)
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
    return <CustomLoader loading={true} message="loading activities..." />
  }

  return (
    <StyledGrid
      container
      direction="column"
      justifyContent="start"
      alignItems="start"
    >
      <Grid item xs={12} container direction="column" justifyContent="center">
        <ListingHeader
          title={headerActivity?.title}
          cityName={headerActivity?.cityName}
          img={headerActivity?.img}
        />
        <Paper elevation={2} className="searchbarContainer">
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
          items={filteredActivities ? filteredActivities : activities}
          source="activities"
        />
      </Grid>
    </StyledGrid>
  )
}
