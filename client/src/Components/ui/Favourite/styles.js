import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  likes_container: {
    display: "flex",
    alignItems: "center",
  },

  likes_btn: {
    padding: "0 .2rem 0 0",
  },

  likes_icon: {
    height: "2rem",
    width: "2rem",
  },

  text: {
    fontSize: ".9rem",
  },
}));
