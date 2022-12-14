import { Activity } from '../../../@types/types'
import ActivityCardSmall from './ActivityCardSmall'
import { StyledGalleryContainer } from './styles'

interface ActivityGallerySmallProps {
  activities: Activity[]
}

const ActivityGallerySmall: React.FC<ActivityGallerySmallProps> = ({
  activities,
}) => {
  return (
    <StyledGalleryContainer>
      {activities.map((activity) => (
        <ActivityCardSmall activity={activity} key={activity._id} />
      ))}
    </StyledGalleryContainer>
  )
}

export default ActivityGallerySmall
