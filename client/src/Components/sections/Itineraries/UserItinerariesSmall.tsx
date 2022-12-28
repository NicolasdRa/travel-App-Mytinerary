import { Typography } from '@mui/material'

import ItineraryCardSmall from './ItineraryCardSmall'

import { StyledItinerariesContainer } from './styles'
import { User } from '../../../../../client-back/src/Components/Redux/types'

interface UserItinerariesSmallProps {
  currentUser: User
}

const UserItinerariesSmall: React.FC<UserItinerariesSmallProps> = ({
  currentUser: { itineraries },
}) => {
  // FIXME: when user loads for the first time profile page loads user itinerarie, but when it from profile screen it updates profile image or cover image it doesnt loads itineraries: implemented quick fix below: itineraries && itineraries.length > 0

  if (itineraries && itineraries.length > 0) {
    return (
      <StyledItinerariesContainer>
        <div className="gallery">
          {itineraries.map((itinerary) => (
            <ItineraryCardSmall itinerary={itinerary} key={itinerary._id} />
          ))}
        </div>
      </StyledItinerariesContainer>
    )
  } else {
    return (
      <Typography variant="body1" className="text">
        No contributions found. Create your itineraries and help the community
        grow.
      </Typography>
    )
  }
}

export default UserItinerariesSmall
