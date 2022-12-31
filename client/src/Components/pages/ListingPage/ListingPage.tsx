import { Alert } from '@mui/material'

import { Header } from '../../sections/Header/Header'
import { Footer } from '../../sections/Footer/Footer'
import { BottomNav } from '../../sections/BottomNav/BottomNav'
import { CustomTabs } from '../../ui/CustomTabs/CustomTabs'
import { Cities } from '../../sections/Cities/Cities'
import { Activities } from '../../sections/Activities/Activities'
import { Itineraries } from '../../sections/Itineraries/Itineraries'
import { CreateItemForm } from '../../forms/CreateItemForm/CreateItemForm'

import { useAppSelector } from '../../../redux/hooks'
import { selectCurrentUser } from '../../../redux/usersSlice'

import { StyledListingPageContainer } from './styles'

export const ListingPage = () => {
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <StyledListingPageContainer>
      <Header />
      <CustomTabs
        firstTabTitle={'Cities'}
        secondTabTitle={'Itineraries'}
        thirdTabTitle={'Activities'}
        firstComponent={<Cities />}
        secondComponent={<Itineraries />}
        thirdComponent={<Activities />}
      />
      {currentUser ? (
        <CreateItemForm currentUser={currentUser} />
      ) : (
        <Alert color="error">
          You must log in in order to create an itinerary
        </Alert>
      )}
      <BottomNav sx={{ display: { xs: 'flex', lg: 'none' } }} />
      <Footer sx={{ display: { xs: 'none', md: 'flex' } }} />
    </StyledListingPageContainer>
  )
}
