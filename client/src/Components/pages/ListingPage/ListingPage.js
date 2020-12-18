import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Tabs, Tab, Typography, Box } from "@material-ui/core";
import { useSelector } from "react-redux";

import Cities from "../../ui/Cities/Cities";
import Itineraries from "../../ui/Itineraries/Itineraries";
import Activities from "../../ui/Activities/Activities";
import CreateIitineraryForm from "../../ui/CreateItineraryForm/CreateItineraryForm";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}>
      {value === index && (
        <Box
          style={{
            padding: "1rem",
          }}
          p={3}>
          {children}
        </Box>
      )}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component='a'
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    flex: "0 0 auto",
    width: "100%",
    margin: "0 1rem",
  },
}));

const ListingPage = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.root}>
      <Paper position='static'>
        <Tabs
          variant='fullWidth'
          value={value}
          onChange={handleChange}
          aria-label='nav tabs example'>
          <LinkTab label='Cities' href='/drafts' {...a11yProps(0)} />
          <LinkTab label='Itineraries' href='/trash' {...a11yProps(1)} />
          <LinkTab label='Activities' href='/spam' {...a11yProps(2)} />
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
      {isAuthenticated ? <CreateIitineraryForm /> : null}
    </Box>
  );
};

export default ListingPage;
