import { Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React from "react"

type ListItemProps = {
  header: React.ReactNode,
  subHeader: React.ReactNode,
  onEdit?: () => any
}

export default (props: ListItemProps) => {
  return (
    <React.Fragment>
      <ListItem 
        alignItems="flex-start" 
        divider
        secondaryAction={
          props.onEdit && 
          <IconButton edge="end" aria-label="delete">
            <EditIcon onClick={props.onEdit} />
          </IconButton>
        }
      >
        <ListItemAvatar>
          {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
        </ListItemAvatar>
        <ListItemText
          primary={props.header}
          secondary={props.subHeader}
        />
      </ListItem>
      {/* <Divider  /> */}
    </React.Fragment>
  )
}