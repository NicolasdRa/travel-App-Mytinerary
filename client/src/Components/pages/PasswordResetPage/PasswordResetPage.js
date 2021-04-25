import React from 'react'

import { Box } from '@material-ui/core'

import { Header } from '../../ui/Header/Header'
import { PasswordResetForm } from '../../ui/PasswordResetForm/PasswordResetForm'

import { useStyles } from './styles'

export const PasswordResetPage = () => {
  const classes = useStyles()
  return (
    <>
      <Box className={classes.background}>
        <Header />
        <PasswordResetForm />
      </Box>
    </>
  )
}
