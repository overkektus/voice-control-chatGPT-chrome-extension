import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Typography, Stack, Slider } from "@mui/material";

interface CustomSliderSProps {
  title: string;
  currentValue: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

export default function CustomSlider({
  title,
  currentValue,
  setValue,
  min,
  max,
  step,
}: CustomSliderSProps) {
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handlePlus = () => setValue(Number((currentValue + step).toFixed(2)));
  const handleMinus = () => setValue(Number((currentValue - step).toFixed(2)));

  return (
    <div className="my-2">
      <Typography fontSize="1.2rem" variant="h3" sx={{ marginBottom: "1rem" }}>
        {title}: {currentValue}
      </Typography>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <div onClick={handleMinus} className="cursor-pointer">
          <RemoveIcon />
        </div>
        <Slider
          aria-label="Volume"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
        />
        <div onClick={handlePlus} className="cursor-pointer">
          <AddIcon />
        </div>
      </Stack>
    </div>
  );
}
