import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  CircularProgress,
} from '@mui/material';

interface UploadDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  title?: string;
  accept?: string;
}

const UploadFileDialog: React.FC<UploadDialogProps> = ({ open, onClose, onUpload, title = "Upload File", accept = "*" }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setIsLoading(true);
      try {
        await onUpload(file);
        onClose();
      } catch (error) {
        alert('Failed to upload file');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Please select a file to upload');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Input type="file" inputProps={{ accept }} onChange={handleFileChange} fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpload} color="primary" disabled={isLoading || !file}>
          {isLoading ? <CircularProgress size={24} /> : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadFileDialog;