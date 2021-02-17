import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

import { useStyles } from "./styles";
const classes = useStyles();

const withLoader = (WrappedComponent) => {
  const Loader = ({ isLoading, ...otherProps }) => {
    return isLoading ? (
      <div className={classes.loader}>
        <PuffLoader color="red" loading={true} size={80} />
      </div>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Loader;
};

export default withLoader;
