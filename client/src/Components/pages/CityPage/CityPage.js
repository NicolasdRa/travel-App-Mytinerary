import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import ItineraryGallery from "../../ui/ItineraryGallery/ItineraryGallery";
import ImageHeader from "../../ui/Headers/ImageHeader";
import CreateIitineraryForm from "../../ui/CreateItineraryForm/CreateItineraryForm";

import { Box, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    flex: "0 0 auto",
    width: "100%",
  },

  header: {
    height: "20rem",
    width: "100%",
  },

  city_title: {
    display: "flex",
    flexDirection: "column",
    flex: "0 0 auto",
    textAlign: "left",
    marginTop: "1.5rem",
    marginLeft: "1rem",
  },

  subtitle: {
    display: "flex",
    flexDirection: "column",
    flex: "0 0 auto",
    textAlign: "left",
    marginLeft: "1rem",
  },

  gallery: {
    display: "flex",
    flexDirection: "column",
    flex: "0 0 auto",
    textAlign: "left",
    marginTop: "1.5rem",
  },
}));

const CityPage = (props) => {
  const classes = useStyles();
  const cityName = props.match.params.city_name;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const city = useSelector((state) =>
    state.cities.cities.data.filter((city) => city.name === cityName),
  );
  const itineraries = useSelector((state) =>
    state.itineraries.itineraries.data.filter(
      (itineraries) => itineraries.city === cityName,
    ),
  );

  const { name, img, country } = city[0];

  return (
    <Box className={classes.content}>
      <ImageHeader img={img} className={classes.header} />
      <Box className={classes.city_title}>
        <Typography variant='overline'>{country}</Typography>
        <Typography variant='h5'>{name}</Typography>
      </Box>
      <Box className={classes.gallery}>
        {itineraries.length > 0 && (
          <Typography className={classes.subtitle}>
            Available itineraries for {name}
          </Typography>
        )}
        <ItineraryGallery itineraries={itineraries} />
      </Box>
      {isAuthenticated ? <CreateIitineraryForm /> : null}
    </Box>
  );
};

CityPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      city_name: PropTypes.string.isRequired,
    }),
  }),
};

export default CityPage;
