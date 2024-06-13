// AddEditNonProfit.tsx
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { NonProfit } from "../../data/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (nonProfit: Partial<NonProfit>) => void;
  nonProfit?: NonProfit;
}

const AddEditNonProfit = ({ open, onClose, onSubmit, nonProfit }: Props) => {
  const [formData, setFormData] = useState<Partial<NonProfit>>({
    name: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    if (nonProfit) {
      setFormData(nonProfit);
    }
  }, [nonProfit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{nonProfit ? "Edit" : "Add"} Non-Profit</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="address"
          label="Address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {nonProfit ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditNonProfit;
