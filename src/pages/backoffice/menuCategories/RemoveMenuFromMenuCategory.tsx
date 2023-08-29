import { config } from "@/config";
import { useAppDispatch } from "@/store/hooks";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocationsSlice";
import { getSelectedLocationId } from "@/utils/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Menus } from "@prisma/client";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  menu?: Menus;
  menuCategoryId: number;
}

const RemoveMenuFromMenuCategory = ({
  open,
  setOpen,
  menu,
  menuCategoryId,
}: Props) => {
  const selectedLocationId = getSelectedLocationId() as string;

  const dispatch = useAppDispatch();

  const handleRemoveMenuFromMenuCategory = async () => {
    await fetch(`${config.apiBaseUrl}/menuCategories/removeMenu`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        menuId: menu?.id,
        menuCategoryId,
        locationId: Number(selectedLocationId),
      }),
    });
    dispatch(fetchMenusMenuCategoriesLocations(selectedLocationId));
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center", mt: "0.5rem" }}>
        Remove <span style={{ color: "primary.main" }}>{menu?.name}</span> From
        Menu Category
      </DialogTitle>
      <DialogContent sx={{ mt: "0.5rem" }}>
        Are you sure you want to remove{" "}
        <span style={{ color: "primary.main" }}>{menu?.name}</span> from this
        menu category?
      </DialogContent>
      <DialogActions sx={{ mb: "0.5rem", mr: "1rem" }}>
        <Button
          sx={{ mr: "3rem" }}
          onClick={() => setOpen(false)}
          variant="text"
        >
          Cancel
        </Button>
        <Button onClick={handleRemoveMenuFromMenuCategory} variant="contained">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveMenuFromMenuCategory;
