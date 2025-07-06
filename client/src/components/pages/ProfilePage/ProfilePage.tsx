import { useMediaQuery } from '@mui/material'

import { BottomNav } from '../../sections/BottomNav/BottomNav'
import { Footer } from '../../sections/Footer/Footer'
import { theme } from '../../../theme/Theme'
import { Header } from '../../sections/Header/Header'
import { CustomLoader } from '../../ui/CustomLoader/CustomLoader'
import { PageUserInfoCard } from '../../ui/PageUserInfoCard/PageUserInfoCard'
import { PageUserTabsCard } from '../../ui/PageUserTabsCard/PageUserTabsCard'
import { CreateItemForm } from '../../forms/CreateItemForm/CreateItemForm'

import { User } from '../../../@types/types'
import { Hero } from '../../sections/Hero/Hero'
import { StyledContainer } from './styles'

interface ProfilePageProps {
  user: User
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  if (!user) {
    return <CustomLoader loading={true} message="Profile Page" />
  }
  
  const { coverImg } = user
  
  return (
    <StyledContainer>
      <div className="header-area">
        <Header />
      </div>
      
      <div className="content-area">
        {/* Hero Section with User Avatar Overlay */}
        <div className="profile-hero-section">
          <Hero img={coverImg} size="small" />
          <PageUserInfoCard user={user} />
        </div>
        
        {/* Main Content Section */}
        <div className="profile-content-section">
          <PageUserTabsCard />
          
          {/* Footer positioned at bottom on desktop */}
          {!mdDown && (
            <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
              <Footer />
            </div>
          )}
        </div>
        
        {/* Create Item Form Section */}
        <CreateItemForm currentUser={user} />
      </div>
      
      {mdDown && (
        <div className="bottom-nav-area">
          <BottomNav />
        </div>
      )}
    </StyledContainer>
  )
}
