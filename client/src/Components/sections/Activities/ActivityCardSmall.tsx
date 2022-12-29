import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { StyledSmallCard } from './styles'
import { Activity } from '../../../@types/types'

interface ActivityCardSmallProps {
  activity: Activity
}

const ActivityCardSmall: React.FC<ActivityCardSmallProps> = ({
  activity: { title, img },
}) => {
  return (
    <StyledSmallCard className="root">
      <CardActionArea>
        <CardMedia className="media" image={img} title={title} />
        <CardContent
          component={Link}
          to={'/activitypage/' + title}
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
    </StyledSmallCard>
  )
}

export default ActivityCardSmall
