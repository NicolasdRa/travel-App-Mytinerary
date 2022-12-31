import { Alert, Typography } from '@mui/material'
import { CardGallerySmall } from '../CardGallerySmall/CardGallerySmall'
import { useAppSelector } from '../../../redux/hooks'
import { selectCurrentUser } from '../../../redux/usersSlice'
import { Activity, Itinerary, User } from '../../../@types/types'
import { StyledContainer } from './styles'
import { selectItinerariesByUserId } from '../../../redux/itinerariesSlice'
import { selectActivitiesByUserId } from '../../../redux/activitiesSlice'

interface UserTabProps {
  parent: 'itineraries' | 'activities' | 'cities'
}

export const UserTab: React.FC<UserTabProps> = ({ parent }) => {
  const user = useAppSelector(selectCurrentUser)
  const { _id } = user as User

  const itineraries = useAppSelector<Itinerary[]>((state) =>
    selectItinerariesByUserId(state, user && user._id)
  )

  const activities = useAppSelector<Activity[]>((state) =>
    selectActivitiesByUserId(state, user && user._id)
  )

  // TODO: virtual populate user activities in backend and destructure them from user
  const favourites = [] as Activity[]

  //TODO: create selectors to return favourite activities and itineraries separately from favourites and replace data in favourites with them

  const getDataType = (parent: 'itineraries' | 'activities' | 'cities') => {
    const dataType = {
      itineraries: itineraries,
      activities: activities,
      cities: [],
    }
    return dataType[parent]
  }

  return (
    <StyledContainer>
      <Typography variant="body2" className="subtitles">
        Created by me
      </Typography>
      {getDataType(parent).length > 0 ? (
        <div className="gallery">
          <CardGallerySmall items={getDataType(parent)} source={parent} />
        </div>
      ) : (
        <Alert severity="info">
          No contributions yet. Create your {parent} and help the community
          grow!
        </Alert>
      )}
      <Typography variant="body2" className="subtitles">
        Liked by me
      </Typography>
      {favourites.length > 0 ? (
        <div className="gallery">
          <CardGallerySmall items={favourites} source={parent} />
        </div>
      ) : (
        <Alert severity="info">
          No favourites yet. Give a like to {parent} and you will see them here!
        </Alert>
      )}
    </StyledContainer>
  )
}
