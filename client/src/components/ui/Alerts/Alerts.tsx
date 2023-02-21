import { Alert } from '@mui/material'
import uuid from 'react-uuid'

export default function Alerts(errors: any) {
  return errors.map((error: any) => (
    <div key={uuid()}>
      <Alert color="error" style={{ color: 'red', margin: '1.5rem' }}>
        {error.msg}
      </Alert>
    </div>
  ))
}
