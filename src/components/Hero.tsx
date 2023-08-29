import { Box, Button, Slide, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box
      sx={{
        mt: "250px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Slide
        direction="down"
        in={true}
        mountOnEnter
        unmountOnExit
        timeout={1000}
      >
        <Box>
          <Typography
            sx={{
              maxWidth: 700,
              mb: 4,
              fontSize: { xs: "16px", md: "25px" },
            }}
          >
            Manage your menu catelog easily with Pizngo and entice your
            customers with QR code ordering system.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                mr: 5,
                width: "fit-content",
                backgroundColor: "secondary.main",
              }}
            >
              Order App
            </Button>
            <Button
              variant="contained"
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                width: "fit-content",
                backgroundColor: "secondary.main",
              }}
            >
              Backoffice App
            </Button>
          </Box>
        </Box>
      </Slide>
    </Box>
  );
};

export default Hero;
