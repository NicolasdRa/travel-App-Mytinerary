import { Typography, Button, Box } from '@mui/material'
import { useState, useMemo } from 'react'

import { CustomCard } from '../../ui/CustomCard/CustomCard'
import { Activity, City, Itinerary } from '../../../@types/types'

import { StyledContainer } from './styles'

interface CardGalleryProps {
  items: Activity[] | Itinerary[] | City[]
  source: 'itineraries' | 'cities' | 'activities'
}

const ITEMS_PER_PAGE = 12

export const CardGallery: React.FC<CardGalleryProps> = ({ items, source }) => {
  const [currentPage, setCurrentPage] = useState(1)

  // Memoize paginated items to avoid recalculation on every render
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return items.slice(0, endIndex)
  }, [items, currentPage])

  const hasMoreItems = items.length > currentPage * ITEMS_PER_PAGE

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  return (
    <StyledContainer>
      {items.length > 0 ? (
        <>
          {paginatedItems.map((item: Activity | Itinerary | City) => {
            const { _id, ...rest } = item
            return <CustomCard source={source} key={_id} {...rest} />
          })}
          {hasMoreItems && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, width: '100%' }}>
              <Button 
                variant="outlined" 
                onClick={handleLoadMore}
                size="large"
              >
                Load More {source}
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Typography className="message">No {source} found.</Typography>
      )}
    </StyledContainer>
  )
}
