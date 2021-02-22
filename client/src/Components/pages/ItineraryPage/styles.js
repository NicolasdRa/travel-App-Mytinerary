import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  loader: {
    display: "flex",
    margin: "35vh auto",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    flex: "0 0 auto",
    width: "100%",
  },

  header: {
    height: "20rem",
    width: "100%",
  },

  content: {
    display: "flex",
    flexDirection: "column",
    margin: "0 1rem",
  },

  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1rem",
  },

  overline: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: "1rem",
    padding: "0 0 0 1rem",
  },

  city_title: {
    display: "flex",
    flex: "0 0 auto",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  likes_btn: {},

  extra_info: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 1rem",
  },

  user_info: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  avatar: {
    height: "1.5rem",
    width: "1.5rem",
    marginRight: ".5rem",
  },

  price_time: {
    display: "flex",
    marginLeft: "auto",
    alignItems: "center",
    padding: "1rem 0",
  },

  icons: {
    fontSize: "1rem",
    marginRight: ".2rem",
    color: "grey",
  },

  duration: {
    display: "flex",
    alignItems: "center",
  },

  price: {
    display: "flex",
    alignItems: "center",
    marginLeft: "1rem",
  },

  info_icon: {
    alignItems: "center",
    fill: "grey",
  },

  divider: {
    margin: "1rem",
  },

  text: {
    display: "flex",
    flexDirection: "column",
    flex: "0 0 auto",
    textAlign: "left",
    margin: "1rem",
  },

  gallery: {
    display: "flex",
    flexDirection: "column",
    flex: "0 0 auto",
  },

  subtitle: {
    display: "flex",
    justifySelf: "start",
    marginLeft: "1rem",
  },
  comment_btns: {
    display: "flex",
    alignItems: "center",
    marginLeft: "1rem",
  },

  view_btn: {
    alignItems: "center",
  },

  text_btn: {
    alignItems: "center",
  },

  write_icon: {
    alignItems: "center",
  },
}));
