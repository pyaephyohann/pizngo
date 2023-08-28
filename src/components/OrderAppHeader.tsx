import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Box, IconButton, Typography } from "@mui/material";
import { Locations } from "@prisma/client";
import { useRouter } from "next/router";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

const OrderAppHeader = () => {
  const router = useRouter();
  const query = router.query;
  const locationId = router.query.locationId;
  const { locations, cart } = useAppSelector(appData);

  const location = locations.find(
    (item) => item.id === Number(locationId)
  ) as Locations;

  return (
    <Box
      sx={{
        p: "1rem",
        px: "3rem",
        bgcolor: "secondary.main",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link
        style={{ textDecoration: "none" }}
        href={{ pathname: "/order", query }}
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
      </Link>
      {location ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocationOnIcon sx={{ fontSize: "1.8rem", color: "primary.main" }} />
          <Typography
            sx={{
              fontSize: "1.3rem",
              color: "white",
              ml: "0.5rem",
              fontFamily: "'Dosis', sans-serif",
            }}
          >
            {location.name}
          </Typography>
        </Box>
      ) : (
        ""
      )}
      <Link href={{ pathname: "/order/viewCart", query }}>
        <Box
          sx={{
            position: "relative",
            bgcolor: "primary.main",
            borderRadius: "5rem",
            p: "0.2rem",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: "-0.9rem",
              right: "-0.5rem",
              color: "white",
              py: "0.1rem",
              px: "0.5rem",
              bgcolor: "primary.main",
              borderRadius: "5rem",
            }}
          >
            {cart.length}
          </Typography>
          <IconButton>
            <ShoppingCartIcon sx={{ color: "white", fontSize: "2.3rem" }} />
          </IconButton>
        </Box>
      </Link>
    </Box>
  );
};

export default OrderAppHeader;
