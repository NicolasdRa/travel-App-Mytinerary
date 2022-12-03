import React from 'react'

import { Header } from '../../ui/Header/Header'
import { PasswordResetForm } from '../../ui/PasswordResetForm/PasswordResetForm'

import { useStyles } from './styles'

export const PasswordResetPage = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.background}>
        <Header />
        <PasswordResetForm />
      </div>
    </>
  )
}
