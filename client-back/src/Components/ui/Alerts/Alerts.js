import React from 'react'
import { Alert } from 'reactstrap'
import uuid from 'react-uuid'

export default function Alerts (errors) {
  console.log(this.errors)
  return errors.map(error => (
    <div key={uuid()}>
      <Alert color='danger' style={{ color: 'red', margin: '1.5rem' }}>
        {error.msg}
      </Alert>
    </div>
  ))
}
