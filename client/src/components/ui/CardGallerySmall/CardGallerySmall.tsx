import { Activity, City, Favourite, Itinerary } from '../../../@types/types'
import { CardSmall } from '../CardSmall/CardSmall'
import { StyledGalleryContainer } from './styles'

interface CardGallerySmallProps {
  items: Activity[] | Itinerary[] | City[]
  source: 'itineraries' | 'cities' | 'activities'
}

export const CardGallerySmall: React.FC<CardGallerySmallProps> = ({
  items,
  source,
}) => {
  return (
    <StyledGalleryContainer>
      {items.map((item) => {
        const { _id, ...rest } = item

        return <CardSmall source={source} key={_id} {...rest} />
      })}
    </StyledGalleryContainer>
  )
}
