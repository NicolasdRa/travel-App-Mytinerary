import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const ItemList = ({ activities }) => {
  const classes = useStyles();

  const items = activities.map((activity) => (
    <div>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='activity image' src={activity.img} />
        </ListItemAvatar>
        <ListItemText
          primary={activity.title}
          secondary={
            <React.Fragment>
              <Typography
                component='span'
                variant='body2'
                className={classes.inline}
                color='textPrimary'>
                {activity.category}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant='inset' component='li' />
    </div>
  ));

  return <List className={classes.root}>{items}</List>;
};

ItemList.propTypes = {
  activities: PropTypes.array.isRequired,
};

export default ItemList;
