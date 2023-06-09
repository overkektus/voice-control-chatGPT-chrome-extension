import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const langLocales = [
  { name: "English(US)", tag: "en-US" },
  { name: "German", tag: "de-DE" },
  { name: "Russian", tag: "ru-RU" },
];

export default function BasicSelect() {
  const [language, setLanguage] = useState<string>("");

  const handleChange = (event: SelectChangeEvent): void => {
    setLanguage(event.target.value as string);
  };

  return (
    <Box sx={{ width: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="select-label">Language</InputLabel>
        <Select
          labelId="select-label"
          id="demo-simple-select"
          value={language}
          label="Language"
          onChange={handleChange}
        >
          {langLocales.map((lang) => (
            <MenuItem key={lang.tag} value={lang.tag}>
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
