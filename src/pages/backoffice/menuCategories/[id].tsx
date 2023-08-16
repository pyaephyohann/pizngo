import ItemsSelector from "@/components/ItemsSelector";
import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import {
  deleteMenuCategory,
  updateMenuCategory,
} from "@/store/slices/menuCategoriesSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocationsSlice";
import {
  getLocationsByMenuCategoryId,
  getMenusByLocationId,
  getMenusByMenuCategoryId,
  getSelectedLocationId,
} from "@/utils/client";
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import AddMenuToMenuCategory from "./AddMenuToMenuCategory";
import { MenuCategories, Menus } from "@prisma/client";
import RemoveMenuFromMenuCategory from "./RemoveMenuFromMenuCategory";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "@/components/DeleteDialog";

const EditMenuCategory = () => {
  const router = useRouter();

  const dispatch: any = useAppDispatch();

  const [openAdd, setOpenAdd] = useState<boolean>(false);

  const [openRemove, setOpenRemove] = useState<boolean>(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);

  const [selectedMenuToRemove, setSelectedMenuToRemove] = useState<Menus>();

  const { menuCategories, menus, menusMenuCategoriesLocations, locations } =
    useAppSelector(appData);

  const menuCategoryId = router.query.id as string;

  const menuCategory = menuCategories.find(
    (item: MenuCategories) => item.id === Number(menuCategoryId)
  ) as MenuCategories;

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

  const handleDeleteMenuCategory = async () => {
    await fetch(
      `${config.apiBaseUrl}/menuCategories?menuCategoryId=${menuCategoryId}`,
      {
        method: "DELETE",
      }
    );
    dispatch(deleteMenuCategory(menuCategory));
    dispatch(fetchMenusMenuCategoriesLocations(selectedLocationId));
    router.push("/backoffice/menuCategories");
  };

  if (!menuCategory) return null;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "0.5rem" }}>
        <Button
          onClick={() => setOpenDeleteDialog(true)}
          color="error"
          variant="contained"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </Box>
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
                  <Paper elevation={3} sx={{ p: "1rem" }}>
                    <Image
                      src={item.assetUrl || ""}
                      alt={item.name}
                      width={180}
                      height={150}
                      style={{ borderRadius: "0.8rem", marginTop: "1rem" }}
                    />
                    <IconButton
                      onClick={() => {
                        setSelectedMenuToRemove(item);
                        setOpenRemove(true);
                      }}
                      sx={{ position: "absolute", top: "0", right: "0" }}
                    >
                      <CancelIcon />
                    </IconButton>

                    <Typography
                      sx={{
                        textAlign: "center",
                        mt: "0.6rem",
                        fontSize: "1.2rem",
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Paper>
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
        <RemoveMenuFromMenuCategory
          open={openRemove}
          setOpen={setOpenRemove}
          menu={selectedMenuToRemove}
          menuCategoryId={Number(menuCategoryId)}
        />
        <DeleteDialog
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          title="Are you sure you want to delete this MenuCategory"
          callBack={handleDeleteMenuCategory}
        />
      </Box>
    </Box>
  );
};

export default EditMenuCategory;
