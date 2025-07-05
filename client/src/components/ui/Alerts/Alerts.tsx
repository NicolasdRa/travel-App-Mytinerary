import { Alert } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'

export default function Alerts(errors: any) {
  return errors.map((error: any) => (
    <div key={uuidv4()}>
      <Alert color="error" style={{ color: 'red', margin: '1.5rem' }}>
        {error.msg}
      </Alert>
    </div>
  ))
}
