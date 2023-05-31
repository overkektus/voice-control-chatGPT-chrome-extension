import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";

const Popup = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          Voice Control for ChatGPT
        </Typography>
        <Divider />
        <Typography variant="h6" component="div">
          Keyboard shortcuts
        </Typography>
        <ul>
          <li>
            Press-and-hold SPACE (outside text input) to record, and release to
            submit
          </li>
          <li>Press ESC or Q to cancel a transcription</li>
          <li>
            Press E to stop and copy the transcription to the ChatGPT input
            field without submitting
          </li>
        </ul>
        <Divider />
      </CardContent>
      <CardActions>
        <Typography variant="h6" component="div">
          Need help?
        </Typography>
        <Typography>Please fill out this form or write an email</Typography>
      </CardActions>
    </Card>
  );
};

export default Popup;
