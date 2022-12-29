import { Divider, Typography } from '@mui/material'

import { CardGallerySmall } from '../CardGallerySmall/CardGallerySmall'
import { Activity, City, Itinerary } from '../../../@types/types'
import { StyledContainer } from './styles'

interface PageGalleryCardProps {
  title: string | undefined
  items: Activity[] | Itinerary[] | City[]
  source: 'itineraries' | 'cities' | 'activities'
}

export const PageGalleryCard: React.FC<PageGalleryCardProps> = ({
  title,
  items,
  source,
}) => {
  return (
    <StyledContainer>
      <Typography variant="body2" className="subtitle">
        {items?.length > 0 ? `Available ${source}` : 'No activities found'} for{' '}
        {title}
      </Typography>

      <CardGallerySmall items={items} source={source} />
      <Divider className="divider" />
    </StyledContainer>
  )
}
