import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "0.3rem",
    minWidth: "12rem",
    maxWidth: "15rem",
    overflow: "visible",
  },

  cardHeader: {
    paddingBottom: "13px",
  },

  title: {
    textAlign: "left",
    fontSize: "1rem",
    fontWeight: "500",
  },

  subheader: {
    textAlign: "left",
    fontSize: ".8rem",
  },

  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  cardContent: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: "0",
    paddingTop: "13px",
  },

  avatar: {
    backgroundColor: theme.palette.secondary.main,
    height: "1rem",
    width: "1rem",
    alignSelf: "flex-start",
  },

  authorInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  authorName: {
    margin: "0 0 0 5px",
    fontSize: ".7rem",
  },

  additionalInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    // padding: '5px 5px 0 0'
  },

  duration: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: ".7rem",
    // marginRight: '8px'
  },

  price: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    fontSize: ".7rem",
  },

  icons: {
    height: ".7rem",
    width: ".7rem",
    fill: "grey",
    marginRight: "3px",
  },

  cardActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingTop: 0,
    paddingBottom: 0,
  },

  textBtn: { margin: "0 3px 5px 0", fontSize: ".7rem" },

  likesBtn: {
    paddingLeft: "8px",
  },
}));
