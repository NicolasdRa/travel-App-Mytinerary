import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(-1.5),
  },

  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },

  customWidth: {
    maxWidth: 130,
  },

  menuItem: {
    fontSize: ".75rem",
  },
}));
