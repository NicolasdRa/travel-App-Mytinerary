import React from 'react'

import { Box } from '@material-ui/core'

import { Header } from '../../ui/Header/Header'
import { Signup } from '../../ui/Signup/Signup'

import { useStyles } from './styles'

export const SignupPage = () => {
  const classes = useStyles()
  return (
    <>
      <Box className={classes.background}>
        <Header />
        <Signup />
      </Box>
    </>
  )
}
