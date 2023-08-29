import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        height: 150,
        bgcolor: "#4C4C6D",
        px: "12px",
      }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          m: "0 auto",
          display: "flex",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography sx={{ color: "#E8F6EF", fontStyle: "italic" }}>
              Thirimon Street <br />
              Mayangone, Yangon <br />
              contact @pizngo.shop
              <br />
              +95 9757814509
            </Typography>
          </Box>
          <Box sx={{ width: "150px", position: "relative", mt: 2 }}>
            <Typography
              sx={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: "2.5rem",
                color: "white",
              }}
            >
              Pizngo
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ color: "#E8F6EF", fontStyle: "italic" }}>
              Order app
              <br /> Backoffice app
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
