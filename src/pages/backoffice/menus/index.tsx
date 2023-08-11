import MenuCard from "@/components/MenuCard";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getMenusByLocationId, getSelectedLocationId } from "@/utils/client";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import NewMenu from "./NewMenu";

const Menus = () => {
  const { menus, menusMenuCategoriesLocations } = useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId() as string;
  const [open, setOpen] = useState<boolean>(false);

  const validMenus = getMenusByLocationId(
    selectedLocationId,
    menusMenuCategoriesLocations,
    menus
  );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Menu
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {validMenus.map((menu) => {
          return (
            <MenuCard
              key={menu.id}
              menu={menu}
              href={`/backoffice/menus/${menu.id}`}
            />
          );
        })}
      </Box>
      <NewMenu open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Menus;
