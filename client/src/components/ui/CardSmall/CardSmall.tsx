import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { StyledSmallCard } from './styles'

interface ActivityCardSmallProps {
  source: 'itineraries' | 'cities' | 'activities'
  // All other props
  [x: string]: any
}

export const CardSmall: React.FC<ActivityCardSmallProps> = ({
  source,
  ...rest
}) => {
  const { img, title, name } = rest

  const getUrl = (source: 'itineraries' | 'cities' | 'activities') => {
    const paths = {
      activities: '/activitypage/',
      itineraries: '/itinerarypage/',
      cities: '/citypage/',
    }

    return `${paths[source]}${title}`
  }

  return (
    <StyledSmallCard className="root">
      <CardActionArea>
        <CardMedia
          className="media"
          image={img}
          title={source === 'cities' ? name : title}
        />
        <CardContent
          component={Link}
          to={getUrl(source)}
          className="card_underlineNone"
        >
          <Typography
            className="card_title"
            gutterBottom
            variant="subtitle2"
            component="h6"
            color="primary"
          >
            {source === 'cities' ? name : title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </StyledSmallCard>
  )
}
