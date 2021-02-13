import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  container: {
    backgroundImage:
      "radial-gradient(circle, rgba(255, 255, 255, .7) 0%, rgba(255, 255, 255, 1) 60%), url(" +
      Image +
      ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "90vh",
    margin: "0",
    padding: "0",

    [theme.breakpoints.up("lg")]: {
      height: "96vh",
    },
  },

  startBtn: {
    margin: "1rem 0",
    width: "12rem",
    height: "3rem",

    [theme.breakpoints.up("sm")]: {
      margin: "4rem 0 3rem 0",
      width: "15rem",
      height: "3.5rem",
      fontSize: "1.1rem",
    },

    [theme.breakpoints.up("lg")]: {
      margin: "5rem 0 4rem 0",
      width: "18rem",
      height: "4rem",
      fontSize: "1.2rem",
    },
  },

  question: {
    margin: "3rem 0 1rem 0",
    [theme.breakpoints.up("sm")]: {
      margin: "1rem 0 0 0",
      fontSize: "1.5rem",
    },

    [theme.breakpoints.up("lg")]: {
      margin: "2rem 0",
      fontSize: "2rem",
    },
  },

  textGuest: { margin: "1rem 0 0 0" },

  btnsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "1rem 0 2.5rem 0",

    [theme.breakpoints.up("sm")]: {
      margin: "1rem 5rem 4rem 5rem",
    },

    [theme.breakpoints.up("lg")]: {
      margin: "1rem 5rem 4rem 5rem",
    },
  },

  modal_btn: {
    margin: "0 .5rem",
    height: "3rem",
    width: "6rem",
    [theme.breakpoints.up("sm")]: {
      margin: "0 1.5rem",
      width: "8rem",
      height: "3rem",
      fontSize: "1.1rem",
    },

    [theme.breakpoints.up("lg")]: {
      margin: "0 1.5rem",
      width: "8rem",
      height: "3.5rem",
      fontSize: "1.2rem",
    },
  },
}));
