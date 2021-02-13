import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { selectCityByName } from "../../Redux/citiesSlice";
import { selectAllItinerariesForCity } from "../../Redux/itinerariesSlice";
// import { getCitiesGeoDB } from '../../Redux/citiesSlice'

import ItineraryGallery from "../../ui/ItineraryGallery/ItineraryGallery";
import ImageHeader from "../../ui/Headers/ImageHeader";
import CreateIitineraryForm from "../../ui/CreateItineraryForm/CreateItineraryForm";

import { Box, Typography } from "@material-ui/core";

import { useStyles } from "./styles";

const CityPage = ({ match }) => {
  const classes = useStyles();
  // const dispatch = useDispatch()

  const cityName = match.params.city_name;

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const city = useSelector((state) => selectCityByName(state, cityName));
  const itineraries = useSelector((state) =>
    selectAllItinerariesForCity(state, cityName),
  );
  // const itineraries = useSelector((state) =>
  //   state.itineraries.data.filter(
  //     (itineraries) => itineraries.city === cityName,
  //   ),
  // )

  // useEffect(() => {
  //   dispatch(getCitiesGeoDB(cityName))
  //   return () => {
  //     // cleanup
  //   }
  // }, [])

  const { name, img, country } = city;

  return (
    <Box className={classes.content}>
      <ImageHeader img={img} className={classes.header} />
      <Box className={classes.city_title}>
        <Typography variant="overline">{country}</Typography>
        <Typography variant="h5">{name}</Typography>
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
