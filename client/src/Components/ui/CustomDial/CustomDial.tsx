import { useState } from 'react'

import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  useMediaQuery,
} from '@mui/material'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import TourIcon from '@mui/icons-material/Tour'
import LocalActivityIcon from '@mui/icons-material/LocalActivity'
import { theme } from '../../../theme/Theme'
import { toggleAddItemForm, toggleBackdrop } from '../../../redux/uiSlice'
import { useAppDispatch } from '../../../redux/hooks'

const actions = [
  {
    icon: <LocationCityIcon />,
    name: 'City',
    action: toggleAddItemForm('city'),
  },
  {
    icon: <TourIcon />,
    name: 'Itinerary',
    action: toggleAddItemForm('itinerary'),
  },
  {
    icon: <LocalActivityIcon />,
    name: 'Activity',
    action: toggleAddItemForm('activity'),
  },
]

export const CustomDial = () => {
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const [open, setOpen] = useState(false)

  const dispatch = useAppDispatch()

  const handleOpen = () => {
    setOpen(true)
    dispatch(toggleBackdrop())
  }

  const handleClose = () => {
    setOpen(false)
    dispatch(toggleBackdrop())
  }

  return (
    <SpeedDial
      ariaLabel="SpeedDial"
      sx={{ position: 'absolute', bottom: 54, right: 16 }}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      FabProps={{ color: 'secondary' }}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => {
            handleClose()
            dispatch(action.action)
          }}
          tooltipOpen={mdDown ? true : false}
        />
      ))}
    </SpeedDial>
  )
}
