import {
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Card,
  CardContent,
  CardActions,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

export interface FieldConfig<T> {
  label: string;
  key: Extract<keyof T, string>;
}

export interface ActionConfig<T> {
  label: string;
  icon: SvgIconComponent;
  callback: (item: T) => void;
}

interface Props<T> {
  items: T[];
  fields: FieldConfig<T>[];
  actions?: ActionConfig<T>[];
}

const ListComponent = <T,>({ items, fields, actions }: Props<T>) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const showActions = actions !== undefined;

  if(items.length === 0) {
    return (
      <Typography variant="h6" align="center" color="textSecondary" sx={{mt: 2}}>
        No records found. Click on the add button below to create a new record.
      </Typography>
    ) 
  }

  if (isMobile) {
    return (
      <Grid container spacing={3}>
        {
          items.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Card
                sx={{
                  borderRadius: theme.shape.borderRadius,
                  boxShadow: theme.shadows[3],
                  transition: "box-shadow 0.3s ease",
                  ":hover": {
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <CardContent>
                  {fields.map((field) => (
                    <Box key={field.key as string} sx={{ mb: 1, display: 'flex' }}>
                      <Typography variant="subtitle2" fontWeight="bold" color="textSecondary" sx={{ minWidth: 150 }}>
                        {field.label}:
                      </Typography>
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {String(item[field.key])}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
                {
                  showActions && 
                  <CardActions>
                    {actions.map((action, idx) => (
                      <Tooltip key={idx} title={action.label} arrow>
                        <IconButton
                          color="primary"
                          onClick={() => action.callback(item)}
                        >
                          <action.icon />
                        </IconButton>
                      </Tooltip>
                    ))}
                  </CardActions>
                }
              </Card>
            </Grid>
          ))
        }
      </Grid>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {fields.map((field) => (
              <TableCell key={field.key as string}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {field.label}
                </Typography>
              </TableCell>
            ))}
            {
              showActions && <TableCell>Actions</TableCell>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              {fields.map((field) => (
                <TableCell key={field.key as string}>
                  {String(item[field.key])}
                </TableCell>
              ))}
              {
                showActions && 
                <TableCell>
                  {actions.map((action, idx) => (
                    <Tooltip key={idx} title={action.label} arrow>
                      <IconButton
                        color="primary"
                        onClick={() => action.callback(item)}
                      >
                        <action.icon />
                      </IconButton>
                    </Tooltip>
                  ))}
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListComponent;
