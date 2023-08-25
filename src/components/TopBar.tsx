import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

const TopBar = () => {
  const { data } = useSession();
  const router = useRouter();

  const getTitle = () => {
    const pathname = router.pathname;
    if (pathname.includes("orders")) return "Orders";
    if (pathname.includes("menus")) return "Menus";
    if (pathname.includes("menuCategories")) return "MenuCategories";
    if (pathname.includes("addons")) return "Addons";
    if (pathname.includes("addonCategories")) return "AddonCategories";
    if (pathname.includes("tables")) return "Tables";
    if (pathname.includes("locations")) return "Locations";
    if (pathname.includes("settings")) return "Settings";
  };
  return (
    <Box>
      <AppBar sx={{ bgcolor: "secondary.main" }} position="static">
        <Toolbar>
          {data ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                p: "0.5rem",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontFamily: "'Dancing Script', cursive",
                    fontSize: "2.5rem",
                  }}
                >
                  Pizngo
                </Typography>
              </Box>

              <Typography variant="h6">{getTitle()}</Typography>

              <Button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                variant="text"
                size="large"
                sx={{ color: "white" }}
              >
                Sign out
              </Button>
            </Box>
          ) : (
            <Typography
              component="div"
              variant="h6"
              sx={{ textAlign: "center", flexGrow: 1 }}
            >
              Pizngo
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
