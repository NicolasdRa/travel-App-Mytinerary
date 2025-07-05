import React from 'react'
import { styled } from '@mui/material/styles'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

const StyledList = styled(List)(({ theme }) => ({
  width: '100%',
  maxWidth: '36ch',
  backgroundColor: theme.palette.background.paper,
}))

const InlineTypography = styled(Typography)({
  display: 'inline',
})

interface Activity {
  _id: string
  title: string
  category: string
  img: string
}

interface ItemListProps {
  activities: Activity[]
}

const ItemList: React.FC<ItemListProps> = ({ activities }) => {
  const items = activities.map((activity) => (
    <div key={activity._id}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="activity image" src={activity.img} />
        </ListItemAvatar>
        <ListItemText
          primary={activity.title}
          secondary={
            <React.Fragment>
              <InlineTypography
                variant="body2"
                color="textPrimary"
              >
                {activity.category}
              </InlineTypography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  ))

  return <StyledList>{items}</StyledList>
}

export default ItemList