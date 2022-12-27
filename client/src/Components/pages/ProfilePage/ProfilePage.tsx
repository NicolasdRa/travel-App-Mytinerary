import React, { SetStateAction, useState } from 'react'

import PuffLoader from 'react-spinners/PuffLoader'
import {
  Avatar,
  Box,
  Divider,
  Paper,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { ImageHeader } from '../../ui/Headers/ImageHeader'
import UserItinerariesSmall from '../../ui/Itineraries/UserItinerariesSmall'
import EditProfileForm from '../../ui/EditProfileForm/EditProfileForm'
import { FavouriteComponent } from '../../ui/FavouriteComponent/FavouriteComponent'

import { StyledContainer } from './styles'
import { User } from '../../../@types/types'
import { CreateItineraryForm } from '../../ui/CreateItineraryForm/CreateItineraryForm'

import { BottomNav } from '../../ui/BottomNav/BottomNav'
import { Footer } from '../../ui/Footer/Footer'
import { theme } from '../../Styles/Theme'
import { Header } from '../../ui/Header/Header'

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

  console.log(favourites)
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
              <UserItinerariesSmall currentUser={user} />
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
