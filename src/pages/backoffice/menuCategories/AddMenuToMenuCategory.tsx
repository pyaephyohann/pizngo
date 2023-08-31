import ItemsSelector from "@/components/ItemsSelector";
import { config } from "@/config";
import { useAppDispatch } from "@/store/hooks";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocationsSlice";
import { getSelectedLocationId } from "@/utils/client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

interface Menu {
  id: number;
  name: string;
}

interface Props {
  openAdd: boolean;
  setOpenAdd: (value: boolean) => void;
  menus: Menu[];
  menuCategoryId: number;
  setOpenSuccessAlertForAddMenu: (value: boolean) => void;
}

const AddMenuToMenuCategory = ({
  openAdd,
  setOpenAdd,
  menus,
  menuCategoryId,
  setOpenSuccessAlertForAddMenu,
}: Props) => {
  const [selectedMenuIds, setSelectedMenuIds] = useState<number[]>([]);

  const selectedLocationId = getSelectedLocationId() as string;

  const dispatch = useAppDispatch();

  const locationId = Number(selectedLocationId);

  const isDisabled = !selectedMenuIds.length;

  const handleAddMenuToMenuCategory = async () => {
    const response = await fetch(
      `${config.apiBaseUrl}/menuCategories/addMenu`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          menuCategoryId,
          menuIds: selectedMenuIds,
          locationId,
        }),
      }
    );
    dispatch(fetchMenusMenuCategoriesLocations(selectedLocationId));
    setOpenAdd(false);
    if (response.status === 200) {
      setOpenSuccessAlertForAddMenu(true);
    }
  };

  return (
    <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
      <DialogTitle sx={{ textAlign: "center", mt: "0.5rem" }}>
        Add Menu To Menu Category
      </DialogTitle>
      <DialogContent sx={{ mt: "0.5rem" }}>
        <ItemsSelector
          options={menus}
          onChange={(values) =>
            setSelectedMenuIds(values.map((item) => item.id))
          }
          label="Menus"
          placeholder="Menus"
        />
      </DialogContent>
      <DialogActions sx={{ mb: "0.5rem" }}>
        <Button
          disabled={isDisabled}
          onClick={handleAddMenuToMenuCategory}
          sx={{ mx: "auto" }}
          variant="contained"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMenuToMenuCategory;
