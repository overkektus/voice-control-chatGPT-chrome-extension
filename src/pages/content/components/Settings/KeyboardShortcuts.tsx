import { Typography, TypographyProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import emotion from "@emotion/styled";

export default function KeyboardShortcuts() {
  return (
    <>
      <Typography fontSize="1.4rem" variant="h3" sx={{ marginBottom: "1rem" }}>
        Keyboard shortcuts
      </Typography>
      <TypographyInstruction>
        Press-and-hold <ControlKey>SPACE</ControlKey> (outside text input) to
        record, and release to submit
      </TypographyInstruction>
      <TypographyInstruction>
        Press <ControlKey>ESC</ControlKey> or <ControlKey>Q</ControlKey> to
        cancel a transcription
      </TypographyInstruction>
      <TypographyInstruction>
        Press <ControlKey>E</ControlKey> to stop and copy the transcription to
        the ChatGPT input field without submitting
      </TypographyInstruction>
    </>
  );
}

const TypographyInstruction = styled(Typography)<TypographyProps>(() => ({
  fontSize: "1rem",
  margin: "15px 0",
}));

const ControlKey = emotion.span`
  color: red
`;
