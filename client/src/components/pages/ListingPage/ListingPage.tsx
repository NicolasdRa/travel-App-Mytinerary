import { Alert, useMediaQuery } from '@mui/material'

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

import { StyledContainer } from './styles'
import { theme } from '../../../theme/Theme'

export const ListingPage = () => {
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <StyledContainer>
      <div className="header-area">
        <Header />
      </div>
      
      <div className="content-area">
        <CustomTabs
          firstTabTitle={'Cities'}
          secondTabTitle={'Itineraries'}
          thirdTabTitle={'Activities'}
          firstComponent={
            <>
              <Cities />
              {!mdDown && <Footer />}
            </>
          }
          secondComponent={
            <>
              <Itineraries />
              {!mdDown && <Footer />}
            </>
          }
          thirdComponent={
            <>
              <Activities />
              {!mdDown && <Footer />}
            </>
          }
        />
        {currentUser ? (
          <CreateItemForm currentUser={currentUser} />
        ) : (
          <Alert color="error">
            You must log in in order to create an itinerary
          </Alert>
        )}
      </div>
      
      {mdDown && (
        <div className="bottom-nav-area">
          <BottomNav />
        </div>
      )}
    </StyledContainer>
  )
}
