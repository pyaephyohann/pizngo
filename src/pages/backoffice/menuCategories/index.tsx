import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import {
  getMenuCategoriesByLocationId,
  getSelectedLocationId,
} from "@/utils/client";
import { Box, Button } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import NewMenuCategory from "./NewMenuCategory";
import { MenusMenuCategoriesLocations } from "@prisma/client";

const MenuCategories = () => {
  const { menuCategories, menusMenuCategoriesLocations } =
    useAppSelector(appData);

  const selectedLocationId = getSelectedLocationId() as string;

  const [open, setOpen] = useState<boolean>(false);

  const validMenuCategories = getMenuCategoriesByLocationId(
    selectedLocationId,
    menuCategories,
    menusMenuCategoriesLocations
  );

  const getMenusCount = (menuCategoryId?: number) => {
    if (!menuCategoryId) return 0;
    return menusMenuCategoriesLocations.filter(
      (item: MenusMenuCategoriesLocations) =>
        item.menuCategoryId === menuCategoryId &&
        item.menuId &&
        item.locationId === Number(selectedLocationId)
    ).length;
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          New Menu Category
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {validMenuCategories.map((item) => {
          return (
            <ItemCard
              key={item.id}
              href={`/backoffice/menuCategories/${item.id}`}
              icon={
                <CategoryIcon
                  sx={{ fontSize: "2.5rem", color: "secondary.main" }}
                />
              }
              title={item.name}
              subTitle={`${getMenusCount(item.id)} Menus`}
            />
          );
        })}
      </Box>
      <NewMenuCategory open={open} setOpen={setOpen} />
    </Box>
  );
};

export default MenuCategories;
