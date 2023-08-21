import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Box, Typography } from "@mui/material";
import { Locations } from "@prisma/client";
import { useRouter } from "next/router";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const OrderAppHeader = () => {
  const router = useRouter();
  const locationId = router.query.locationId;
  const { locations } = useAppSelector(appData);

  const location = locations.find(
    (item) => item.id === Number(locationId)
  ) as Locations;

  return (
    <Box
      sx={{
        p: "1rem",
        px: "3rem",
        bgcolor: "#8062D6",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: "2.5rem",
          color: "white",
        }}
      >
        Pizngo
      </Typography>
      {location ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocationOnIcon sx={{ fontSize: "1.8rem", color: "#00DFA2" }} />
          <Typography
            sx={{
              fontSize: "1.3rem",
              color: "white",
              ml: "0.5rem",
              fontFamily: "'Indie Flower', cursive",
            }}
          >
            {location.name}
          </Typography>
        </Box>
      ) : (
        ""
      )}
      <Box>
        <Typography sx={{ fontSize: "1.3rem", color: "white" }}>
          Cart Here
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderAppHeader;
