import { VolumeDown, VolumeUp } from "@mui/icons-material";
import { Typography, Stack, Slider } from "@mui/material";
import { useState } from "react";

export default function Loud() {
  const [value, setValue] = useState<number>(30);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <>
      <Typography fontSize="1.2rem" variant="h3">
        Read aloud speed: {value}
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider aria-label="Volume" value={value} onChange={handleChange} />
        <VolumeUp />
      </Stack>
    </>
  );
}
