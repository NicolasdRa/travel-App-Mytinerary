import React from 'react'
import { Typography, Container } from '@material-ui/core'
import { useSelector } from 'react-redux'
import './Profile.css'
import Header from '../Header/Header'

export default function Profile () {
  const user = useSelector(state => state.auth.user)

  return (
    <Container maxWidth='sm' className='profileContainer'>
      <Header />
      {user ? (
        <Typography variant='h4' align='center' className='profileTitle'>
          Welcome {user.userName}, this is your profile page
        </Typography>
      ) : (
        <Typography variant='h4' align='center' className='profileTitle'>
          Please log in or register to acces your profile page
        </Typography>
      )}
    </Container>
  )
}
