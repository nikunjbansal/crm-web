import { useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Fab,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useGetGrantsQuery } from "../api/features/grants";
import ListComponent from "../components/ListComponent";
import UploadDialog from "../components/UploadFileDialog";
import { useUploadGrantsCsvMutation } from "../api/features/grants";
import { GrantsFields } from "../api/features/grants/types";
import { useSnackbar } from "../context";

const Grants = () => {
  const { data: grants, isLoading } = useGetGrantsQuery();
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadGrantsCsv] = useUploadGrantsCsvMutation();

  const { openSnackbar } = useSnackbar();

  const handleUploadClick = () => {
    setShowUploadDialog(true);
  };

  const handleUploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadGrantsCsv(formData).unwrap();
      openSnackbar('File uploaded successfully');
    } catch (error) {
      openSnackbar('Failed to upload file');
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f0f2f5", minHeight: "100vh", py: 4 }}>
      <Box sx={{padding: 1}} >
        <Typography variant="h4" align="center" gutterBottom>
          Manage Grants
        </Typography>
        <Grid container justifyContent="center" mt={2}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <ListComponent
              items={grants || []}
              fields={GrantsFields}
              actions={[]}
            />
          )}
        </Grid>
        <Fab
          color="primary"
          aria-label="upload"
          onClick={handleUploadClick}
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          <AddIcon />
        </Fab>
        <UploadDialog
          open={showUploadDialog}
          onClose={() => setShowUploadDialog(false)}
          onUpload={handleUploadFile}
          title="Upload CSV File"
          accept=".csv"
        />
      </Box>
    </Box>
  );
};

export default Grants;