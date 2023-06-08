import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Divider, DividerProps } from "@mui/material";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Loud from "./Loud";
import Voice from "./Voice";
import FAQSuggestion from "./FAQSuggestion";
import KeyboardShortcuts from "./KeyboardShortcuts";

interface SettingsModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export default function SettingsModal({
  isOpen,
  handleClose,
}: SettingsModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontSize="2rem" variant="h2">
                Voice Control for ChatGPT
              </Typography>
              <Button
                sx={{ height: "fit-content" }}
                variant="contained"
                onClick={handleClose}
              >
                Close
              </Button>
            </Stack>
            <StyledDivider />
          </Grid>
          <Grid item xs={6}>
            <Loud />
            <StyledDivider />
            <Voice />
          </Grid>
          <Grid item xs={6}>
            <KeyboardShortcuts />
            <StyledDivider />
            <FAQSuggestion />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

const StyledDivider = styled(Divider)<DividerProps>(() => ({
  margin: "20px",
  borderColor: "gray",
}));

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "rgba(0, 0, 0, 0.7)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
