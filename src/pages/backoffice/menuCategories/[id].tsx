import ItemsSelector from "@/components/ItemsSelector";
import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { updateMenuCategory } from "@/store/slices/menuCategoriesSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocationsSlice";
import {
  getLocationsByMenuCategoryId,
  getMenusByLocationId,
  getMenusByMenuCategoryId,
  getSelectedLocationId,
} from "@/utils/client";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";

import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import AddMenuToMenuCategory from "./AddMenuToMenuCategory";

const EditMenuCategory = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [openAdd, setOpenAdd] = useState<boolean>(false);

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

  const validMenuIds = validMenus.map((item) => item.id);

  const currentLocationMenus = getMenusByLocationId(
    selectedLocationId,
    menusMenuCategoriesLocations,
    menus
  );

  const inValidMenus = currentLocationMenus.filter(
    (item) => !validMenuIds.includes(item.id)
  );

  const mappedInvalidMenus = inValidMenus.map((item) => ({
    id: item.id,
    name: item.name,
  }));

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
    <Box sx={{ display: "flex", mt: "2rem" }}>
      {/* Left Side Update Menu Category Name and Locations */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: "3rem" }}>
          Update Name and Locations
        </Typography>
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
      {/* Right Side Remove And Add Menus */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ mb: "2rem", textAlign: "center" }}>
          Menus
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: "2rem",
          }}
        >
          <Button
            onClick={() => setOpenAdd(true)}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add Menu
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {validMenus.map((item) => {
            return (
              <Box key={item.id} sx={{ position: "relative", m: "1rem" }}>
                <Image
                  src={item.assetUrl || ""}
                  alt={item.name}
                  width={180}
                  height={150}
                  style={{ borderRadius: "1rem" }}
                />
                <IconButton sx={{ position: "absolute", top: "0", right: "0" }}>
                  <CancelIcon />
                </IconButton>
              </Box>
            );
          })}
        </Box>
      </Box>
      <AddMenuToMenuCategory
        menuCategoryId={Number(menuCategoryId)}
        openAdd={openAdd}
        setOpenAdd={setOpenAdd}
        menus={mappedInvalidMenus}
      />
    </Box>
  );
};

export default EditMenuCategory;
