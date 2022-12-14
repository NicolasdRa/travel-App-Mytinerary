import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

import { Link } from 'react-router-dom'
import { Itinerary } from '../../../../../client-back/src/Components/Redux/types'
import { StyledCard } from './styles'

interface ItineraryCardSmallProps {
  itinerary: Itinerary
}

const ItineraryCardSmall: React.FC<ItineraryCardSmallProps> = ({
  itinerary: { title, img },
}) => {
  return (
    <StyledCard>
      <CardActionArea>
        {img && <CardMedia className="media" image={img} title={title} />}
        <CardContent
          component={Link}
          to={`/itinerarypage/${title}`}
          className="card_underlineNone"
        >
          <Typography
            className="card_title"
            gutterBottom
            variant="subtitle2"
            component="h6"
            color="primary"
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledCard>
  )
}

export default ItineraryCardSmall
