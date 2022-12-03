import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}))

const ItemList = ({ activities }) => {
  const classes = useStyles()

  const items = activities.map((activity) => (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="activity image" src={activity.img} />
        </ListItemAvatar>
        <ListItemText
          primary={activity.title}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {activity.category}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  ))

  return <List className={classes.root}>{items}</List>
}

ItemList.propTypes = {
  activities: PropTypes.array.isRequired,
}

export default ItemList
