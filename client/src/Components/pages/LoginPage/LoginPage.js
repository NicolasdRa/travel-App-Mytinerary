import React from 'react'

import { Box } from '@material-ui/core'

import { Header } from '../../ui/Header/Header'
import { Login } from '../../ui/Login/Login'

import { useStyles } from './styles'

export const LoginPage = () => {
  const classes = useStyles()
  return (
    <>
      <Box className={classes.background}>
        <Header />
        <Login />
      </Box>
    </>
  )
}
