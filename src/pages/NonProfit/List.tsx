import { Box, Button, Container, Grid, List, ListItemText, Paper, TextField, Typography } from "@mui/material"
import ListItem from "../../components/ListItem";
import { NonProfit } from "../../data/types"
import React from "react";

type Props = {
  nonProfits: NonProfit[],
  onEdit: Function
}

export default ({ nonProfits, onEdit }: Props) => {

  const RenderItem = (nonProfit: NonProfit) => {
    return (
      <ListItem 
        header={
          <Typography>{nonProfit.name}</Typography>
        }
        subHeader={
          <React.Fragment>
            <Box>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
              >
                Address: 
              </Typography>
              <Typography 
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {nonProfit.address}
              </Typography>
            </Box>
            <Box>
              <Typography 
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
              >
                Email: 
              </Typography>
              <Typography 
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                  {` ${nonProfit.email}`}
              </Typography>
            </Box>
          </React.Fragment>
        }
        onEdit={
          () => onEdit(nonProfit)
        }
      />
    )
  }

  return (
    <Paper>
      <List>
        {
          nonProfits.map(RenderItem)
        }
      </List>
    </Paper>
  )
}