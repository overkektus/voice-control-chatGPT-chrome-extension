import { Typography, TypographyProps, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function FAQSuggestion() {
  return (
    <>
      <Typography fontSize="1.2rem" variant="h3" sx={{ marginBottom: "1rem" }}>
        Voice preference
      </Typography>
      <StyledTypography>
        If you have trouble loading voices or need help troubleshooting please
        see the{" "}
        <Link href="#" underline="hover">
          FAQ.
        </Link>
      </StyledTypography>
      <StyledTypography>
        If you have suggestions on how to improve the extension please share
        your ideas{" "}
        <Link href="#" underline="hover">
          here.
        </Link>
      </StyledTypography>
    </>
  );
}

const StyledTypography = styled(Typography)<TypographyProps>(() => ({
  fontSize: "0.8rem",
  margin: "15px 0",
}));
