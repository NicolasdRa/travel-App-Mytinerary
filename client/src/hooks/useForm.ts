import { SelectChangeEvent } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import { Activity, Itinerary, Comment, Favourite } from '../@types/types'

export const useForm = (initialState: any) => {
  const [values, setValues] = useState(initialState)

  const reset = () => {
    setValues(initialState)
  }

  const handleInputChange: (
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<any>
  ) => void = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  return { values, handleInputChange, reset }
}
