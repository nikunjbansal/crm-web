import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

interface FieldConfig {
  key: string;
  label: string;
  required?: boolean;
}

interface Props<T> {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: Partial<T>) => void;
  entity?: T;
  fields: FieldConfig[];
  title: string;
}

const AddEditDialog = <T,>({ open, onClose, onSubmit, entity, fields, title }: Props<T>) => {
  const [formData, setFormData] = useState<Partial<T>>({} as Partial<T>);

  useEffect(() => {
    if (entity) {
      setFormData(entity);
    } else {
      const initialFormData = fields.reduce((acc, field) => {
        acc[field.key as keyof T] = "" as unknown as T[keyof T];
        return acc;
      }, {} as Partial<T>);
      setFormData(initialFormData);
    }
  }, [entity, fields]);

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
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid item xs={12} key={field.key}>
              <TextField
                name={field.key}
                label={field.label}
                value={formData[field.key as keyof T] as unknown as string}
                onChange={handleChange}
                fullWidth
                required={field.required ?? false}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {entity ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditDialog;
