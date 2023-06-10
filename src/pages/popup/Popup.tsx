import { Divider, Stack, Link } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import emotion from "@emotion/styled";

const Popup = () => {
  return (
    <Card sx={{ padding: "0.8rem" }}>
      <CardContent>
        <Typography variant="h2" fontWeight="bold" sx={{ fontSize: "1.4rem" }}>
          Voice Control for ChatGPT
        </Typography>
        <Divider sx={{ margin: "0.7rem 0" }} />
        <Typography
          variant="h3"
          fontWeight="bold"
          component="div"
          sx={{ fontSize: "1rem" }}
        >
          Keyboard shortcuts
        </Typography>
        <List>
          <ListItem>
            Press-and-hold <ControlKey>SPACE</ControlKey> (outside text input)
            to record, and release to submit
          </ListItem>
          <ListItem>
            Press <ControlKey>ESC</ControlKey> or <ControlKey>Q</ControlKey> to
            cancel a transcription
          </ListItem>
          <ListItem>
            Press <ControlKey>E</ControlKey> to stop and copy the transcription
            to the ChatGPT input field without submitting
          </ListItem>
        </List>
        <Divider />
      </CardContent>
      <CardActions>
        <Stack direction="column">
          <Typography
            variant="h3"
            fontWeight="bold"
            component="div"
            sx={{ fontSize: "1rem", margin: "0.5rem 0" }}
          >
            Need help?
          </Typography>
          <Typography sx={{ fontSize: "0.7rem" }}>
            Please fill out <Link underline="hover">this form</Link> or{" "}
            <Link underline="hover">write an email</Link>
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  );
};

const List = emotion.ul`
  
`;

const ListItem = emotion.li`
  margin: 0.8rem 0;
  line-height: 1.5;
`;

const ControlKey = emotion.span`
  color: red;
  font-weight: bold;
`;

export default Popup;
