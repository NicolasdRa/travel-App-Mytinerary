import React from 'react'
import 'typeface-roboto'
import './Landing.css'
import Container from '@material-ui/core/Container'
import Header from '../Header/Header'
import MainContent from '../MainContent/MainContent'
import Links from '../Links/Links'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../../store/actions/authActions'
import jwtDecode from 'jwt-decode'

const Landing = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const token = useSelector(state => state.auth.token)

  if (!token || !user) {
    const cookie = document.cookie
    // console.log('cookie', cookie)
    const token = cookie.split('=', 2)[1]
    // console.log('token', token)
    // console.log('decoded', jwtDecode(token))
    const id = jwtDecode(token)._id
    // console.log(id)
    dispatch(loadUser(token, id))
  }

  return (
    <Container maxWidth='sm'>
      <Header />
      <MainContent />
      <h3>Want to build your own MYtinerary?</h3>
      <Links />
    </Container>
  )
}

export default Landing
