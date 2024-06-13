// MainComponent.tsx
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAddNonProfitMutation, useGetNonProfitsQuery, useUpdateNonProfitMutation } from "../../data/api";
import { NonProfit } from "../../data/types";
import AddEditNonProfit from "./AddEditNonProfit";
import NonProfitList from "./List";

const MainComponent = () => {
  const { data: nonProfits, isLoading, refetch } = useGetNonProfitsQuery();
  const [addNonProfit] = useAddNonProfitMutation();
  const [updateNonProfit] = useUpdateNonProfitMutation();
  const [selectedNonProfit, setSelectedNonProfit] = useState<NonProfit | undefined>(undefined);
  const [showDialog, setShowDialog] = useState(false);

  const handleAdd = () => {
    setSelectedNonProfit(undefined);
    setShowDialog(true);
  };

  const handleEdit = (nonProfit: NonProfit) => {
    setSelectedNonProfit(nonProfit);
    setShowDialog(true);
  };

  const handleSubmit = async (nonProfit: Partial<NonProfit>) => {
    if (selectedNonProfit) {
      await updateNonProfit({ id: selectedNonProfit.id, nonProfit });
    } else {
      await addNonProfit(nonProfit);
    }
    setShowDialog(false);
    refetch();
  };

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
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h4">Manage your Non-Profits</Typography>
          <Box sx={{
            padding: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="h6" color={(theme) => theme.palette.secondary.dark}>
              Total Nonprofits: {nonProfits?.length || 0}
            </Typography>
            <Button variant="contained" onClick={handleAdd}>Add New Non-Profit</Button>
          </Box>
          {isLoading ? (
            <Typography>Loading...</Typography>
          ) : (
            <NonProfitList nonProfits={nonProfits || []} onEdit={handleEdit} />
          )}
          <AddEditNonProfit
            open={showDialog}
            onClose={() => setShowDialog(false)}
            onSubmit={handleSubmit}
            nonProfit={selectedNonProfit}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default MainComponent;
