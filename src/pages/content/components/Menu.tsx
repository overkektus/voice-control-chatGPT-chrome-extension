import * as React from "react";
import Paper from "@mui/material/Paper";
import LanguageSelect from "./LanguageSelect";
import { ButtonGroup, IconButton, Stack } from "@mui/material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { VolumeMute } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import { SettingsContext } from "./settingsConext";

interface MenuProps {
  handleOpenSettingsModal: () => void;
}

export default function Menu({ handleOpenSettingsModal }: MenuProps) {
  const { isSpeechOn, toggleSpeech } = React.useContext(SettingsContext);
  return (
    <Paper sx={{ padding: "0.5rem", height: "fit-content" }}>
      <Stack direction="row" spacing={2}>
        <LanguageSelect />
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          size="small"
        >
          <IconButton>
            <SkipNextIcon />
          </IconButton>
          <IconButton onClick={toggleSpeech}>
            {isSpeechOn ? <VolumeUpIcon /> : <VolumeMute />}
          </IconButton>
          <IconButton onClick={handleOpenSettingsModal}>
            <SettingsIcon />
          </IconButton>
        </ButtonGroup>
      </Stack>
    </Paper>
  );
}
