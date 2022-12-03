import React from 'react'

import { Header } from '../../ui/Header/Header'
import { Signup } from '../../ui/Signup/Signup'

import { useStyles } from './styles'

export const SignupPage = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.background}>
        <Header />
        <Signup />
      </div>
    </>
  )
}
