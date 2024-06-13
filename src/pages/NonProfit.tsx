import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  CircularProgress,
  Fab,
  Dialog,
  DialogContent,
  Grid,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAddNonProfitMutation, useGetNonProfitsQuery, useUpdateNonProfitMutation } from "../api/features/non-profit";
import { NonProfit, nonProfitFields } from "../api/features/non-profit/types";
import ListComponent, { ActionConfig } from "../components/ListComponent";
import AddEditDialog from "../components/AddEditDialog";
import EditIcon from "@mui/icons-material/Edit";

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

  const handleSubmit = async (nonProfit: Partial<NonProfit>) => {
    if (selectedNonProfit) {
      await updateNonProfit({ id: selectedNonProfit.id, nonProfit });
    } else {
      await addNonProfit(nonProfit);
    }
    setShowDialog(false);
    refetch();
  };

  const actions: ActionConfig<NonProfit>[] = [
    {
      label: 'Edit',
      icon: EditIcon,
      callback: (nonProfit: NonProfit) => {
        setSelectedNonProfit(nonProfit);
        setShowDialog(true);
      },
    }
  ];

  return (
    <Box sx={{ backgroundColor: "#f0f2f5", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Manage Non-Profits
        </Typography>
          <Grid container justifyContent="center" mt={2}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <ListComponent<NonProfit> items={nonProfits || []} fields={nonProfitFields} actions={actions} />
            )}
          </Grid>
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleAdd}
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          <AddIcon />
        </Fab>
        <Dialog open={showDialog} onClose={() => setShowDialog(false)} maxWidth="sm" fullWidth>
          <DialogContent>
            <AddEditDialog
              open={showDialog}
              onClose={() => setShowDialog(false)}
              onSubmit={handleSubmit}
              entity={selectedNonProfit}
              fields={nonProfitFields}
              title={selectedNonProfit ? "Edit Non-Profit" : "Add Non-Profit"}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default MainComponent;
