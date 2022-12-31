import { useMediaQuery } from '@mui/material'

import { BottomNav } from '../../sections/BottomNav/BottomNav'
import { Footer } from '../../sections/Footer/Footer'
import { theme } from '../../../theme/Theme'
import { Header } from '../../sections/Header/Header'
import { CustomLoader } from '../../ui/CustomLoader/CustomLoader'
import { ImageHeader } from '../../sections/Headers/ImageHeader'
import { PageUserInfoCard } from '../../ui/PageUserInfoCard/PageUserInfoCard'
import { PageUserTabsCard } from '../../ui/PageUserTabsCard/PageUserTabsCard'
import { CreateItemForm } from '../../forms/CreateItemForm/CreateItemForm'

import { User } from '../../../@types/types'

interface ProfilePageProps {
  user: User
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  if (!user) {
    return <CustomLoader loading={true} message="Profile Page" />
  }
  // TODO load favourites
  const { coverImg } = user
  return (
    <>
      <Header />
      <ImageHeader img={coverImg} />
      <PageUserInfoCard user={user} />
      <PageUserTabsCard />
      <CreateItemForm currentUser={user} />
      {mdDown ? <BottomNav /> : <Footer />}
    </>
  )
}
