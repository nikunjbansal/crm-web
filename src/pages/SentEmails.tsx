import {
  Box,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useGetSentEmailsQuery } from "../api/features/email-template";
import { sentEmailFields, SentEmails } from "../api/features/email-template/types";
import ListComponent from "../components/ListComponent";


const MainComponent = () => {
  const { data: sentEmails, isLoading } = useGetSentEmailsQuery();

  return (
    <Box sx={{ backgroundColor: "#f0f2f5", minHeight: "100vh", py: 4 }}>
      <Box sx={{padding: 1}} >
        <Typography variant="h4" align="center" gutterBottom>
          Sent Emails
        </Typography>
          <Grid container justifyContent="center" mt={2}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <ListComponent<SentEmails> items={sentEmails || []} fields={sentEmailFields} />
            )}
          </Grid>
      </Box>
    </Box>
  );
};

export default MainComponent;
