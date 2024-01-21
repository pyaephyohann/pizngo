import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Box } from "@mui/material";
import pandaCooking from "../../public/panda-cooking.png";

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
      <div className="mt-[10rem]">
        <div
          style={{
            backgroundImage: "url(/panda-cooking.png)",
            backgroundSize: "cover",
            height: "40rem",
            width: "40rem",
            position: "relative", // Optional: Set the background size to cover the entire container
          }}
        >
          <div className="text-black absolute top-[10rem] right-0">
            Hello this is the text
          </div>
        </div>
      </div>
      <Footer />
    </Box>
  );
};

export default Pizngo;
