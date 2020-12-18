import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flex: "0 0 auto",
    margin: ".3rem",
    minWidth: "8rem",
    maxWidth: "8rem",
    padding: "0",
  },

  media: {
    height: "6rem",
    objectFit: "cover",
    minWidth: "4rem",
    borderRadius: 3,
  },

  card_underlineNone: {
    textDecoration: "none",
  },

  card_title: {
    padding: "0 .15rem",
    color: "black",
    textDecoration: "none",
    fontWeight: 400,
  },
});

const ActivityCardSmall = (props) => {
  const classes = useStyles();
  const { title, img } = props.activity;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={img} title={title} />
        <CardContent
          component={Link}
          to={"/activitypage/" + title}
          className={classes.card_underlineNone}>
          <Typography
            className={classes.card_title}
            gutterBottom
            variant='subtitle2'
            component='h6'
            textcolor='primary'>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ActivityCardSmall;
