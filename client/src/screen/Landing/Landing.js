import React from 'react'
import 'typeface-roboto'
import './Landing.css'
import Container from '@material-ui/core/Container'
import Header from '../Header/Header'
import MainContent from '../MainContent/MainContent'
import Links from '../Links/Links'

const Landing = () => {
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
