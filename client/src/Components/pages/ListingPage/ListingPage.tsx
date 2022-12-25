import React from 'react'

import { Paper, Tabs, Tab, Box, Alert } from '@mui/material'

import { Header } from '../../ui/Header/Header'
import { Footer } from '../../ui/Footer/Footer'
import { Cities } from '../../ui/Cities/Cities'
import Itineraries from '../../ui/Itineraries/Itineraries'
import Activities from '../../ui/Activities/Activities'
import { CreateItineraryForm } from '../../ui/CreateItineraryForm/CreateItineraryForm'
import { RootState } from '../../Redux/store'
import { useAppSelector } from '../../Redux/hooks'
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

const ListingPage = () => {
  const [value, setValue] = React.useState(0)
  const currentUser = useAppSelector(
    (state: RootState) => state.users.currentUser
  )
  const cities = useAppSelector((state: RootState) => state.cities.data)

  const handleChange = (e: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue)
  }

  return (
    <StyledListingPageContainer className="root">
      <Header />
      <Paper>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Cities" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Itineraries" href="/trash" {...a11yProps(1)} />
          <LinkTab label="Activities" href="/spam" {...a11yProps(2)} />
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
      <Footer />
    </StyledListingPageContainer>
  )
}

export default ListingPage
