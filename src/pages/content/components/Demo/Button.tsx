import Button, { ButtonProps } from "@mui/material/Button";
import MicIcon from "@mui/icons-material/Mic";
import { styled } from "@mui/material/styles";

interface MicButtonProps {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MicButton({ text, onClick }: MicButtonProps) {
  return (
    <StyledButton variant="contained" onClick={onClick}>
      {text}
      <MicIcon />
    </StyledButton>
  );
}

const StyledButton = styled(Button)<ButtonProps>(() => ({
  width: "100%",
  animation: "ease-in",
}));
