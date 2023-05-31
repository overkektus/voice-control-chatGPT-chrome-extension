import "regenerator-runtime/runtime";
import Button, { ButtonProps } from "@mui/material/Button";
import MicIcon from "@mui/icons-material/Mic";
import { styled } from "@mui/material/styles";

export default function MicButton() {
  return (
    <StyledButton variant="contained">
      <MicIcon />
    </StyledButton>
  );
}

const StyledButton = styled(Button)<ButtonProps>(() => ({
  width: "100%",
  height: "3rem",
  animation: "ease-in",
}));
