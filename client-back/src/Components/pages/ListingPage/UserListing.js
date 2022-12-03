import React from 'react'
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types'
import { Paper, Tabs, Tab, Typography, Box } from '@mui/material'
import Itineraries from '../Itineraries/Itineraries'
import Activities from '../Activities/Activities'

const PREFIX = 'UserListing';

const classes = {
  root: `${PREFIX}-root`
};

const StyledBox = styled(Box)((
  {
    theme
  }
) => ({
  [`& .${classes.root}`]: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 auto',
    width: '100%',
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <StyledBox style={{ padding: '0.5rem' }} p={3}>
          {children}
        </StyledBox>
      )}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  }
}

function LinkTab(props) {
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

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box className={classes.root}>
      <Typography variant="body1">Your Contributions</Typography>

      <Paper position="static">
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
