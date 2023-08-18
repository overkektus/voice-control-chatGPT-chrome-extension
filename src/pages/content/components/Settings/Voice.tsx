import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  Box,
} from "@mui/material";
import { useContext } from "react";
import { SettingsContext } from "../settingsConext";

export default function Voice() {
  const { availableVoices, voice, setVoice } = useContext(SettingsContext);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedVoice = availableVoices.find(
      (voice) => voice.name === event.target.value
    );
    if (selectedVoice) {
      setVoice(selectedVoice);
    }
  };

  return (
    <>
      <Typography fontSize="1.4rem" variant="h3" sx={{ marginBottom: "1rem" }}>
        Voice
      </Typography>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
      >
        <FormControl sx={{ m: 1 }}>
          <Select value={voice.name} onChange={handleChange} autoWidth>
            {availableVoices.map((voice) => (
              <MenuItem key={voice.name} value={voice.name}>
                {`${voice.name} ${voice.lang}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
