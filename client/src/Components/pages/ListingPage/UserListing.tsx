import React from 'react'

import { Paper, Tabs, Tab, Typography, Box } from '@mui/material'

import { TabPanelProps } from './ListingPage'
import Itineraries from '../../ui/Itineraries/Itineraries'
import Activities from '../../ui/Activities/Activities'

const PREFIX = 'UserListing'

const classes = {
  root: `${PREFIX}-root`,
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  }
}

function LinkTab(props: any) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault()
      }}
      {...props}
    />
  )
}

const UserListing = () => {
  const [value, setValue] = React.useState(0)

  const handleChange = (e: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue)
  }

  return (
    <Box className={classes.root}>
      <Typography variant="body1">Your Contributions</Typography>

      <Paper>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Itineraries" href="/" {...a11yProps(1)} />
          <LinkTab label="Activities" href="/" {...a11yProps(2)} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <Itineraries />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Activities />
      </TabPanel>
    </Box>
  )
}

export default UserListing
