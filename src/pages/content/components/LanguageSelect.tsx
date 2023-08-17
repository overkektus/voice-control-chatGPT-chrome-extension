import { ChangeEvent, useContext } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { supportedLanguages } from "@src/constants/supportedLanguages";
import { SettingsContext } from "./settingsConext";

export default function BasicSelect() {
  const { language, setLanguage } = useContext(SettingsContext);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = supportedLanguages.find(
      (language) => language.value === event.target.value
    );
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
    }
  };

  return (
    <div className="flex items-center">
      <FormControl fullWidth size="small">
        <NativeSelect
          id="demo-simple-select"
          value={language.value}
          onChange={handleChange}
        >
          {supportedLanguages.map((language) => (
            <option key={language.value} value={language.value}>
              {language.label}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
}
