import React from 'react'

import PuffLoader from 'react-spinners/PuffLoader'
import { Avatar, Divider, Typography } from '@mui/material'

import CreateItineraryForm from '../../ui/CreateItineraryForm/CreateItineraryForm'
import ImageHeader from '../../ui/Headers/ImageHeader'
import UserItinerariesSmall from '../../ui/Itineraries/UserItinerariesSmall'
import EditProfileForm from '../../ui/EditProfileForm/EditProfileForm'
import { FavouriteComponent } from '../../ui/FavouriteComponent/FavouriteComponent'

import { StyledContainer, StyledLoader } from './styles'
import { Favourite, Itinerary, User } from '../../../@types/types'

interface ProfilePageProps {
  user: User
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user: {
    _id,
    coverImg,
    details,
    favourites,
    img,
    itineraries,
    firstName,
    lastName,
    userName,
  },
}) => {
  // TODO load favourites

  return (
    <>
      {/* {!userName && (
        <StyledLoader>
          <PuffLoader color="red" loading={true} size={80} />
        </StyledLoader>
      )} */}

      <StyledContainer>
        <ImageHeader img={coverImg} className="header" />
        <div className="content">
          <Avatar
            alt={firstName + '' + lastName}
            src={img}
            className="userImg"
          />
          <div className="info">
            <div className="edit_btn">
              <EditProfileForm />
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
          <div className="gallery">
            <Typography variant="body2" className="text">
              {details}
            </Typography>
            <Divider className="divider" />
            <UserItinerariesSmall />
            <Divider className="divider" />
          </div>
          <CreateItineraryForm />
        </div>
        {/* {matchesSm ? <BottomNav className={classes.bottomNav} /> : <Footer />} */}
      </StyledContainer>
    </>
  )
}
