import * as React from "react";
import Paper from "@mui/material/Paper";
import LanguageSelect from "./LanguageSelect";
import { ButtonGroup, IconButton, Stack } from "@mui/material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Menu() {
  return (
    <Paper sx={{ padding: "0.5rem" }}>
      <Stack direction="row" spacing={2}>
        <LanguageSelect />
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          size="small"
        >
          <IconButton aria-label="delete">
            <SkipNextIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <VolumeUpIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <SettingsIcon />
          </IconButton>
        </ButtonGroup>
      </Stack>
    </Paper>
  );
}
