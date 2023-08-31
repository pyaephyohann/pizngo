import ItemsSelector from "@/components/ItemsSelector";
import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { addMenuCategory } from "@/store/slices/menuCategoriesSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocationsSlice";
import { getSelectedLocationId } from "@/utils/client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  setOpenSuccessAlert: (value: boolean) => void;
}

const NewMenuCategory = ({ open, setOpen, setOpenSuccessAlert }: Props) => {
  const { locations } = useAppSelector(appData);
  const [newMenuCategory, setNewMenuCategory] = useState({
    name: "",
    locationIds: [] as number[],
  });

  const dispatch = useAppDispatch();

  const selectedLocationId = getSelectedLocationId() as string;

  const isDisabled =
    !newMenuCategory.name || !newMenuCategory.locationIds.length;

  const mappedLocations = locations.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const handleCreateNewMenuCategory = async () => {
    const response = await fetch(`${config.apiBaseUrl}/menuCategories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuCategory),
    });
    const createdMenuCategory = await response.json();
    dispatch(addMenuCategory(createdMenuCategory));
    dispatch(fetchMenusMenuCategoriesLocations(selectedLocationId));
    setOpen(false);
    if (response.status === 200) {
      setOpenSuccessAlert(true);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center", my: "0.5rem" }}>
        Create New Menu Category
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          onChange={(event) =>
            setNewMenuCategory({ ...newMenuCategory, name: event.target.value })
          }
          placeholder="Name"
        />
        <Box sx={{ mt: "1.5rem" }}>
          <ItemsSelector
            label="Location"
            placeholder="Location"
            options={mappedLocations}
            onChange={(values) => {
              setNewMenuCategory({
                ...newMenuCategory,
                locationIds: values.map((item) => item.id),
              });
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isDisabled}
          sx={{ my: "0.5rem", mx: "auto" }}
          onClick={handleCreateNewMenuCategory}
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewMenuCategory;
