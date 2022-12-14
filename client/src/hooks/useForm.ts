import { SelectChangeEvent } from '@mui/material'
import { ChangeEvent, SyntheticEvent, useState } from 'react'

export const useForm = (initialState: any) => {
  const [values, setValues] = useState(initialState)

  const reset = () => {
    setValues(initialState)
  }

  const handleInputChange: (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<any>
      | SyntheticEvent
  ) => void = (e) => {
    const { name, value } = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | any

    setValues({
      ...values,
      [name]: value,
    })
  }

  return { values, handleInputChange, reset }
}
