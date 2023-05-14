import { Divider, Typography } from '@mui/material'

import { Activity, City, Itinerary } from '../../../@types/types'
import { StyledContainer } from './styles'
import { CardGallery } from 'components/sections/CardGallery/CardGallery'

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
        {items?.length > 0 ? `Available ${source}` : `No ${source} found`} for{' '}
        {title}
      </Typography>

      <CardGallery items={items} source={source} />
      <Divider className="divider" />
    </StyledContainer>
  )
}
