import ItemsSelector from "@/components/ItemsSelector";
import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addAddonCategory } from "@/store/slices/addonCategoriesSlice";
import { appData } from "@/store/slices/appSlice";
import { fetchMenusAddonCategories } from "@/store/slices/menusAddonCategoriesSlice";
import { getSelectedLocationId } from "@/utils/client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  setOpenSuccessAlert: (value: boolean) => void;
}

const NewAddonCategory = ({ open, setOpen, setOpenSuccessAlert }: Props) => {
  const selectedLocationId = getSelectedLocationId();
  const { menus, menusMenuCategoriesLocations } = useAppSelector(appData);

  const dispatch = useAppDispatch();

  const [newAddonCategory, setNewAddonCategory] = useState({
    name: "",
    isRequired: false,
    menuIds: [] as number[],
  });

  const validMenuIds = menusMenuCategoriesLocations
    .filter(
      (item) => item.menuId && item.locationId === Number(selectedLocationId)
    )
    .map((item) => item.menuId) as number[];

  const validMenus = menus.filter((item) => validMenuIds.includes(item.id));

  const mappedValidMenus = validMenus.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const isDisabled = !newAddonCategory.name || !newAddonCategory.menuIds.length;

  const handleCreateAddonCategory = async () => {
    const response = await fetch(`${config.apiBaseUrl}/addonCategories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddonCategory),
    });
    const createdAddonCategory = await response.json();
    dispatch(addAddonCategory(createdAddonCategory));
    dispatch(fetchMenusAddonCategories(validMenuIds));
    setOpen(false);
    if (response.status === 200) {
      setOpenSuccessAlert(true);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center", mt: "0.5rem" }}>
        Create New Addon Category
      </DialogTitle>
      <DialogContent>
        <TextField
          onChange={(event) =>
            setNewAddonCategory({
              ...newAddonCategory,
              name: event.target.value,
            })
          }
          placeholder="Name"
          label="Name"
          sx={{ width: "20rem" }}
        />
        <Box sx={{ my: "1.5rem" }}>
          <ItemsSelector
            options={mappedValidMenus}
            label="Menus"
            placeholder="Menus"
            onChange={(values) =>
              setNewAddonCategory({
                ...newAddonCategory,
                menuIds: values.map((item) => item.id),
              })
            }
          />
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={newAddonCategory.isRequired}
              onChange={(evt) =>
                setNewAddonCategory({
                  ...newAddonCategory,
                  isRequired: evt.target.checked,
                })
              }
            />
          }
          label="Required"
        />
      </DialogContent>
      <DialogActions sx={{ mb: "0.5rem" }}>
        <Button
          onClick={handleCreateAddonCategory}
          disabled={isDisabled}
          sx={{ mx: "auto" }}
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewAddonCategory;
