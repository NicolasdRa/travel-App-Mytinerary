import { SetStateAction, useState } from 'react'

import { Paper, Tabs, Tab, Box, Alert } from '@mui/material'

import { Header } from '../../sections/Header/Header'
import { Footer } from '../../sections/Footer/Footer'
import { BottomNav } from '../../sections/BottomNav/BottomNav'
import { Cities } from '../../sections/Cities/Cities'
import { Activities } from '../../sections/Activities/Activities'
import { Itineraries } from '../../sections/Itineraries/Itineraries'
import { CreateItineraryForm } from '../../forms/CreateItineraryForm/CreateItineraryForm'

import { useAppSelector } from '../../../redux/hooks'
import { selectCurrentUser } from '../../../redux/usersSlice'

import { StyledListingPageContainer } from './styles'

export interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
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
      {value === index && <Box>{children}</Box>}
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

export const ListingPage = () => {
  const [value, setValue] = useState(0)
  const currentUser = useAppSelector(selectCurrentUser)

  const handleChange = (e: any, newValue: SetStateAction<number>) => {
    setValue(newValue)
  }

  return (
    <StyledListingPageContainer>
      <Header />
      <Paper>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Cities" {...a11yProps(0)} />
          <LinkTab label="Itineraries" {...a11yProps(1)} />
          <LinkTab label="Activities" {...a11yProps(2)} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <Cities />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Itineraries />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Activities />
      </TabPanel>
      {currentUser ? (
        <CreateItineraryForm currentUser={currentUser} />
      ) : (
        <Alert color="error">
          You must log in in order to create an itinerary
        </Alert>
      )}
      <BottomNav sx={{ display: { xs: 'flex', lg: 'none' } }} />
      <Footer sx={{ display: { xs: 'none', md: 'flex' } }} />
    </StyledListingPageContainer>
  )
}
