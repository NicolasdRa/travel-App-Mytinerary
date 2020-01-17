import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import RestoreIcon from '@material-ui/icons/Restore'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import HomeIcon from '@material-ui/icons/Home'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0
  }
})

export default function BottomNav () {
  const classes = useStyles()
  const [value, setValue] = React.useState('recents')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label='Recents'
        value='recents'
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to='/'
        label='Home'
        value='home'
        icon={<HomeIcon />}
      />

      <BottomNavigationAction
        label='Nearby'
        value='nearby'
        icon={<LocationOnIcon />}
      />
    </BottomNavigation>
  )
}

// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
// import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
// import HomeIcon from '@material-ui/icons/Home'
// import { Link } from 'react-router-dom'
// import './BottomNav.css'

// const useStyles = makeStyles(theme => ({
//   homeButton: {
//     justifyItem: 'center',
//     alignItem: 'center'
//   }
// }))

// const BottomNav = () => {
//   const classes = useStyles()
//   return (
//     <BottomNavigation
//       // value={value}
//       // onChange={(event, newValue) => {
//       // setValue(newValue);
//       // }}

//       showLabels='false'
//       className='footer'
//     >
//       <Link to='/' classes={{ wrapper: classes.homeButton }}>
//         <BottomNavigationAction
//           label='Home'
//           icon={<HomeIcon style={{ fontSize: 40 }} />}
//         />
//       </Link>
//     </BottomNavigation>
//   )
// }

// export default BottomNav
