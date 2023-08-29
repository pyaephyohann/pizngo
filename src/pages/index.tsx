import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

import { Box } from "@mui/material";

const Pizngo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        overflowY: "auto",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box
        sx={{
          maxWidth: { md: "100%", lg: "1280px" },
          m: "0 auto",
          px: { xs: "10px", md: "15px" },
        }}
      >
        <Hero />
        <Features />
      </Box>
      <Footer />
    </Box>
  );
};

export default Pizngo;
