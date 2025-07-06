import { SetStateAction, useState } from 'react'
import { Box, Tab, Tabs, Theme, useMediaQuery, styled } from '@mui/material'

const TabsContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'sticky',
  top: 0,
  zIndex: 1050,
  width: '100%',
  
  [theme.breakpoints.up('md')]: {
    borderBottom: 'none',
    // Remove divider on desktop
  }
}))

const TabContentContainer = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}))

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props

  return (
    <TabContentContainer
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</Box>}
    </TabContentContainer>
  )
}

export const a11yProps = (index: number) => {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  }
}

export const LinkTab = (props: any) => {
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

interface CustomTabsProps {
  firstTabTitle: string
  secondTabTitle: string
  thirdTabTitle?: string
  firstComponent: React.ReactNode
  secondComponent: React.ReactNode
  thirdComponent?: React.ReactNode
}

export const CustomTabs: React.FC<CustomTabsProps> = ({
  firstTabTitle,
  secondTabTitle,
  thirdTabTitle,
  firstComponent,
  secondComponent,
  thirdComponent,
}) => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  const [value, setValue] = useState(0)

  const handleChange = (e: any, newValue: SetStateAction<number>) => {
    setValue(newValue)
  }

  return (
    <>
      <TabsContainer>
        <Tabs
          variant={matches ? 'fullWidth' : 'standard'}
          centered={matches}
          value={value}
          onChange={handleChange}
          aria-label="nav tabs"
          className="tabs"
        >
          <LinkTab label={firstTabTitle} {...a11yProps(0)} />
          <LinkTab label={secondTabTitle} {...a11yProps(1)} />
          {thirdComponent && <LinkTab label={thirdTabTitle} {...a11yProps(2)} />}
        </Tabs>
      </TabsContainer>
      <TabPanel value={value} index={0}>
        {firstComponent}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {secondComponent}
      </TabPanel>
      {thirdComponent && (
        <TabPanel value={value} index={2}>
          {thirdComponent}
        </TabPanel>
      )}
    </>
  )
}
