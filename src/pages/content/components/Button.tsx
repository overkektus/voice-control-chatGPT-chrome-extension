import Button, { ButtonProps } from "@mui/material/Button";
import MicIcon from "@mui/icons-material/Mic";
import { styled } from "@mui/material/styles";

interface MicButtonProps {
  isListening: boolean;
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function MicButton({
  isListening,
  text,
  onClick,
}: MicButtonProps) {
  return (
    <StyledButton variant="contained" onClick={onClick}>
      {isListening && <p className="leading-none py-2">{text}</p>}
      {isListening && (
        <p
          className="normal-case absolute bottom-0 left-1"
          style={{ fontSize: "0.5rem" }}
        >
          Press ESC to cancel or E to edit
        </p>
      )}
      {!isListening && <MicIcon />}
    </StyledButton>
  );
}

const StyledButton = styled(Button)<ButtonProps>(() => ({
  width: "100%",
}));
