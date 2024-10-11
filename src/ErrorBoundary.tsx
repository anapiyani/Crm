import React, { FC } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="grey.100"
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <ErrorOutlineIcon color="error" sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h5" component="h2" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {error.message}
          </Typography>

          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="error-details-content"
              id="error-details-header"
            >
              <Typography>Error Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary" align="left">
                <strong>Name:</strong> {error.name}
                <br />
                <strong>Stack:</strong>
                <br />
                <pre
                  style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                >
                  {error.stack}
                </pre>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Button
            variant="contained"
            color="primary"
            onClick={resetErrorBoundary}
            sx={{ mr: 1 }}
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default ErrorFallback;
