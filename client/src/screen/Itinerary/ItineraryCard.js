import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import ActivityGallery from '../Activities/ActivityGallery'

import {
  // Card,
  // CardActionArea,
  // CardActions,
  // CardContent,
  CardMedia,
  // Button,
  Typography
} from '@material-ui/core'
import { connect } from 'react-redux'
import { fetchItineraries } from '../../store/actions/itineraryActions'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 200
  },
  media: {
    height: 'auto',
    width: '98%'
  },

  root: {
    width: '100%'
  },

  content: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  heading: {
    fontSize: theme.typography.pxToRem(15)
  },

  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}))

const ItineraryCard = props => {
  const classes = useStyles()

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
        classes={{ content: classes.content }}
      >
        <Typography className={classes.heading}>
          {props.itinerary.title}
        </Typography>
        <Typography className={classes.secondaryHeading}>
          Likes:
          {props.itinerary.likes}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <CardMedia
          className={classes.media}
          image={props.itinerary.img}
          title={props.itinerary.city}
        />
        {/* <ActivityGallery activities={props.itinerary.activities} /> */}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

const mapStateToProps = state => {
  return {
    cities: state.cities.cities
    // string: state.string
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchItineraries: cities => dispatch(fetchItineraries(cities))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryCard)
