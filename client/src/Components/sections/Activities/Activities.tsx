import { useState, useEffect } from 'react'

import { Typography } from '@mui/material'

import { CustomLoader } from '../../ui/CustomLoader/CustomLoader'
import { CardGallery } from '../CardGallery/CardGallery'
import { ListingHeader } from '../Headers/ListingHeader'

import {
  selectAllActivities,
  selectRandomActivity,
} from '../../../redux/activitiesSlice'
import { useAppSelector } from '../../../redux/hooks'
import { Activity } from '../../../@types/types'

import { StyledContainer } from './styles'

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
    <StyledContainer>
      <ListingHeader
        title={headerActivity?.title}
        subtitle={headerActivity?.cityName}
        img={headerActivity?.img}
      />

      <Typography variant="subtitle2" className="page-subtitle">
        {string === '' ? 'Most popular Activities' : 'Search results'}
      </Typography>

      <div className="gallery-container">
        <CardGallery
          items={filteredActivities ? filteredActivities : activities}
          source="activities"
        />
      </div>
    </StyledContainer>
  )
}
