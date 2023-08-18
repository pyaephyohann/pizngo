import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import EggIcon from "@mui/icons-material/Egg";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import TableBarIcon from "@mui/icons-material/TableBar";
import Link from "next/link";

const SideBar = () => {
  const sideBarMenuItems = [
    {
      id: 1,
      label: "Orders",
      icon: <LocalMallIcon />,
      route: "/backoffice/orders",
    },
    {
      id: 2,
      label: "Menus",
      icon: <LocalDiningIcon />,
      route: "/backoffice/menus",
    },
    {
      id: 3,
      label: "Menu Categories",
      icon: <CategoryIcon />,
      route: "/backoffice/menuCategories",
    },
    {
      id: 4,
      label: "Addons",
      icon: <EggIcon />,
      route: "/backoffice/addons",
    },
    {
      id: 5,
      label: "Addon Categories",
      icon: <ClassIcon />,
      route: "/backoffice/addonCategories",
    },
    {
      id: 6,
      label: "Tables",
      icon: <TableBarIcon />,
      route: "/backoffice/tables",
    },
    {
      id: 7,
      label: "Locations",
      icon: <LocationOnIcon />,
      route: "/backoffice/locations",
    },
    {
      id: 8,
      label: "Settings",
      icon: <SettingsIcon />,
      route: "/backoffice/settings",
    },
  ];
  return (
    <Box
      sx={{
        minWidth: 250,
        borderTopRightRadius: "2rem",
        minHeight: "100vh",
        bgcolor: "#1976D2",
      }}
    >
      <List>
        {sideBarMenuItems.slice(0, 7).map((item, index) => (
          <Link
            href={item.route}
            key={item.id}
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {sideBarMenuItems.slice(-1).map((item) => (
          <Link
            key={item.id}
            href={item.route}
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
