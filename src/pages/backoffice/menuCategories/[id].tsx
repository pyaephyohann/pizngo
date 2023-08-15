import ItemsSelector from "@/components/ItemsSelector";
import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { updateMenuCategory } from "@/store/slices/menuCategoriesSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocationsSlice";
import {
  getLocationsByMenuCategoryId,
  getMenusByMenuCategoryId,
  getSelectedLocationId,
} from "@/utils/client";
import { Box, Button, TextField } from "@mui/material";
import { Locations } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditMenuCategory = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { menuCategories, menus, menusMenuCategoriesLocations, locations } =
    useAppSelector(appData);

  const menuCategoryId = router.query.id as string;
  const menuCategory = menuCategories.find(
    (item) => item.id === Number(menuCategoryId)
  );

  const [updatedMenuCategoryName, setUpdatedMenuCategoryName] = useState("");

  const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>([]);

  const selectedLocationId = getSelectedLocationId() as string;
  const validMenus = getMenusByMenuCategoryId(
    menuCategoryId,
    selectedLocationId,
    menus,
    menusMenuCategoriesLocations
  );

  const validLocations = getLocationsByMenuCategoryId(
    menuCategoryId,
    locations,
    menusMenuCategoriesLocations
  );

  const handleUpdateMenuCategory = async () => {
    const response = await fetch(`${config.apiBaseUrl}/menuCategories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: menuCategoryId,
        name: updatedMenuCategoryName,
        locationIds: selectedLocationIds,
      }),
    });
    const updatedMenuCategory = await response.json();
    dispatch(updateMenuCategory(updatedMenuCategory));
    dispatch(fetchMenusMenuCategoriesLocations(selectedLocationId));
  };

  if (!menuCategory) return null;

  return (
    <Box
      sx={{
        mt: "2rem",
        width: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField
        onChange={(event) => setUpdatedMenuCategoryName(event.target.value)}
        sx={{ width: "20rem" }}
        label="Name"
        placeholder="Name"
        defaultValue={menuCategory.name}
      />
      <Box sx={{ my: "2.5rem" }}>
        <ItemsSelector
          options={locations}
          defaultValue={validLocations}
          onChange={(values) =>
            setSelectedLocationIds(values.map((item) => item.id))
          }
          label="Location"
          placeholder="Location"
        />
      </Box>
      <Button onClick={handleUpdateMenuCategory} variant="contained">
        Update
      </Button>
    </Box>
  );
};

export default EditMenuCategory;
