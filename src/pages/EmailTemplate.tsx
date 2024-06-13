import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Fab,
  Dialog,
  DialogContent,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useGetEmailTemplatesQuery, useAddEmailTemplateMutation, useUpdateEmailTemplateMutation, useSendEmailMutation } from "../api/features/email-template";
import { EmailTemplate, emailTemplateFields } from "../api/features/email-template/types";
import ListComponent, { ActionConfig } from "../components/ListComponent";
import AddEditDialog from "../components/AddEditDialog";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import { useSnackbar } from "../context";

const EmailTemplateComponent = () => {
  const { data: emailTemplates, isLoading, refetch } = useGetEmailTemplatesQuery();
  const [addEmailTemplate] = useAddEmailTemplateMutation();
  const [updateEmailTemplate] = useUpdateEmailTemplateMutation();
  const [sendEmail] = useSendEmailMutation();
  
  const { openSnackbar } = useSnackbar();

  const [selectedEmailTemplate, setSelectedEmailTemplate] = useState<EmailTemplate | undefined>(undefined);
  const [showDialog, setShowDialog] = useState(false);

  const handleAdd = () => {
    setSelectedEmailTemplate(undefined);
    setShowDialog(true);
  };

  const handleSubmit = async (emailTemplate: Partial<EmailTemplate>) => {
    if (selectedEmailTemplate) {
      await updateEmailTemplate({ id: selectedEmailTemplate.id, emailTemplate });
    } else {
      await addEmailTemplate(emailTemplate);
    }
    setShowDialog(false);
    refetch();
  };

  const actions: ActionConfig<EmailTemplate>[] = [
    {
      label: 'Edit',
      icon: EditIcon,
      callback: (emailTemplate: EmailTemplate) => {
        setSelectedEmailTemplate(emailTemplate);
        setShowDialog(true);
      },
    },
    {
      label: 'Send',
      icon: SendIcon,
      callback: (item: EmailTemplate) => {
        console.log('Send', item);
        sendEmail({templateId: item.id});
        openSnackbar('Email sent successfully!');
      },
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#f0f2f5", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Manage Email Templates
        </Typography>
        <Grid container justifyContent="center" mt={2}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <ListComponent<EmailTemplate> items={emailTemplates || []} fields={emailTemplateFields} actions={actions} />
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
              entity={selectedEmailTemplate}
              fields={emailTemplateFields}
              title={selectedEmailTemplate ? "Edit Email Template" : "Add Email Template"}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default EmailTemplateComponent;
