import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
