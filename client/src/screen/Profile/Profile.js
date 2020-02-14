import React from 'react'
import {
  Avatar,
  Typography,
  Button,
  TextField,
  Container
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import AvatarPicture from '../AvatarPicture/AvatarPicture'
import './Profile.css'
import Header from '../Header/Header'

const styles = theme => ({
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main
  }
})

const Profile = () => {
  // const user = useSelector(state => {
  //   console.log('state :', state)
  //   return state.auth.user
  // })

  return (
    <Container maxWidth='sm' className='profileContainer'>
      <Header />
      <Typography variant='h4' align='center' className='profileTitle'>
        Welcome, this is your profile page
      </Typography>
    </Container>
  )
}

export default Profile
