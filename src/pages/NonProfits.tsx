import { Box, Button, Container, Grid, List, ListItemText, Paper, TextField, Typography } from "@mui/material"
import React from "react";
import { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import { useAddNonProfitMutation, useGetNonProfitsQuery } from "../data/api";
import { NonProfit } from "../data/types";

export default () => {
  const [nonProfits, setNonProfits] = useState<NonProfit[]>([])

  const { data, isLoading, refetch } = useGetNonProfitsQuery(undefined);
  const [ addNonProfit, { isLoading: isAddingNonProfit } ] = useAddNonProfitMutation();

  console.log(data, isLoading)

  const onEdit = (nonProfit: NonProfit) => {

  }

  useEffect(() => {
    setNonProfits([{
      id: 1,
      name: "Test 1",
      address: "Address 1",
      email: "test@gmail.com"
    }, {
      id: 2,
      name: "Test 1",
      address: "Address 1",
      email: "test@gmail.com"
    }, {
      id: 3,
      name: "Test 1",
      address: "Address 1",
      email: "test@gmail.com"
    }, {
      id: 4,
      name: "Test 1",
      address: "Address 1",
      email: "test@gmail.com"
    }])
  }, [])

  const EditItem = (nonProfit: NonProfit) => {
    return 
  }

  const handleAddNew = async () => {
    const { data, error } = await addNonProfit({});

    console.log("result", data, error);
  }

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
          () => refetch()
        }
      />
    )
  }

  return (
    <Box sx={{
      display: 'flex',
      backgroundColor: (theme) => theme.palette.grey[200],
      height: '100vh',
      overflow: 'auto',
      flexDirection: 'column',
      padding: 3
    }}>
      <Container>
        <Paper sx={{
          padding: 3
        }}>
          <Typography variant="h4">Manage your Non Profits</Typography>
          <Box sx={{
            padding: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="h6" color={(theme) => theme.palette.secondary.dark}>Total Nonprofits: 10</Typography>
            <Button variant="contained" onClick={handleAddNew}>Add New Non Profit</Button>
          </Box>
          <Paper>
            <List>
              {
                nonProfits.map(RenderItem)
              }
            </List>
          </Paper>
        </Paper>
      </Container>
    </Box>
  )
}