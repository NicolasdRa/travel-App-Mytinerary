import React from 'react'

import { Header } from '../../ui/Header/Header'
import { Login } from '../../ui/Login/Login'

import { useStyles } from './styles'

export const LoginPage = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.background}>
        <Header />
        <Login />
      </div>
    </>
  )
}
