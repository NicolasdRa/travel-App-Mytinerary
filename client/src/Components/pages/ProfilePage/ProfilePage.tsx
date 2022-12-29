import React, { SetStateAction, useState } from 'react'

import {
  Avatar,
  Box,
  Divider,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { BottomNav } from '../../sections/BottomNav/BottomNav'
import { Footer } from '../../sections/Footer/Footer'
import { theme } from '../../../theme/Theme'
import { Header } from '../../sections/Header/Header'
import { CustomLoader } from '../../ui/CustomLoader/CustomLoader'
import { ImageHeader } from '../../sections/Headers/ImageHeader'
import EditProfileForm from '../../forms/EditProfileForm/EditProfileForm'
import { FavouriteComponent } from '../../ui/FavouriteComponent/FavouriteComponent'
import { CreateItineraryForm } from '../../forms/CreateItineraryForm/CreateItineraryForm'

import { StyledContainer } from './styles'
import { User } from '../../../@types/types'
import { CardGallerySmall } from '../../ui/CardGallerySmall/CardGallerySmall'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  }
}

function LinkTab(props: any) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault()
      }}
      {...props}
    />
  )
}

interface ProfilePageProps {
  user: User
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  const [value, setValue] = useState(0)

  const handleChange = (e: any, newValue: SetStateAction<number>) => {
    setValue(newValue)
  }

  if (!user) {
    return <CustomLoader loading={true} message="Profile Page" />
  }

  // TODO load favourites
  const {
    _id,
    coverImg,
    details,
    favourites,
    img,
    itineraries,
    firstName,
    lastName,
    userName,
  } = user

  //remove this when we have activities
  const activities = null

  return (
    <StyledContainer>
      <Header />
      <ImageHeader img={coverImg} />
      <div className="content">
        <Avatar alt={firstName + '' + lastName} src={img} className="userImg" />
        <div className="info">
          <div className="edit_btn">
            <EditProfileForm currentUser={user} />
          </div>
          <div className="likes">
            <FavouriteComponent
              readOnly={true}
              sourceType={'city'}
              sourceId={''}
              userId={''}
              amount={23}
            />
          </div>
        </div>
        <div className="user_info">
          <Typography variant="h5" className="user_fullName">
            {firstName} {lastName}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="userName"
          >
            {userName}
          </Typography>
        </div>
        <Typography variant="body2" className="details">
          {details}
        </Typography>

        <Tabs
          className="tabs"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="My itineraries" {...a11yProps(0)} />
          <LinkTab label="My Activities" {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          {itineraries ? (
            <div className="gallery">
              <CardGallerySmall items={itineraries} source={'itineraries'} />
            </div>
          ) : (
            <>
              No contributions yet. Create your itineraries and help the
              community grow!
            </>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {activities ? (
            <div className="gallery">Place user activity gallery here</div>
          ) : (
            <>
              No contributions yet. Create your activities and help the
              community grow!
            </>
          )}
        </TabPanel>
        <Divider className="divider" />
        <CreateItineraryForm currentUser={user} />
      </div>
      {mdDown ? <BottomNav /> : <Footer />}
    </StyledContainer>
  )
}
