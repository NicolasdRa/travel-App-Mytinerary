import { useState, useEffect } from 'react'

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
