import { useState, useMemo } from 'react'

import {
  selectAllActivities,
  selectRandomActivity,
} from '../../../redux/activitiesSlice'
import { useAppSelector } from '../../../redux/hooks'
import { Activity } from '../../../@types/types'

import { ListingTab } from '../../ui/ListingTab/ListingTab'

export const Activities = () => {
  const activities = useAppSelector(selectAllActivities)
  const headerActivity = useAppSelector(selectRandomActivity)

  const [string, setString] = useState('')

  // Memoize filtered activities to avoid re-filtering on every render
  const filteredActivities = useMemo(() => {
    if (string === '') return null
    return activities.filter((activity: Activity) =>
      activity.cityName.toLowerCase().startsWith(string)
    )
  }, [activities, string])

  // updates string in state
  const handleChange = (e: any) => {
    setString(e.target.value.toLowerCase())
  }

  return (
    <ListingTab
      source="activities"
      data={filteredActivities ? filteredActivities : activities}
      img={headerActivity.img}
      headerTitle={headerActivity.title}
      headerSubtitle={headerActivity?.cityName}
      searchBarTitle="Want to have fun?"
      searchBarLabel="Search Activities for Itinerary..."
      galleryTitle={
        string === '' ? 'Most popular Activities' : 'Search results'
      }
      handleChange={handleChange}
    />
  )
}
