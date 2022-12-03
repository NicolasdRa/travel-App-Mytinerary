import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

export const PublicRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return <Route {...rest} component={(props) => <Component {...props} />} />;
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
