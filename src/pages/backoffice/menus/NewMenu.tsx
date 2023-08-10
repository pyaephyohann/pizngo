import FileDropZone from "@/components/FileDropZone";
import SelectMenuCategories from "@/components/SelectMenuCategories";
import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocationsSlice";
import { addMenu } from "@/store/slices/menusSlice";
import {
  getMenuCategoriesByLocationId,
  getSelectedLocationId,
} from "@/utils/client";
import {
  Box,
  Button,
  Chip,
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
}

const NewMenu = ({ open, setOpen }: Props) => {
  const [menuImage, setMenuImage] = useState<File[]>([]);
  const { menuCategories, menusMenuCategoriesLocations } =
    useAppSelector(appData);

  const dispatch = useAppDispatch();

  const selectedLocationId = getSelectedLocationId() as string;

  const [newMenu, setNewMenu] = useState({
    name: "",
    price: 0,
    assetUrl: "",
    menuCategoryIds: [] as number[],
    locationId: Number(selectedLocationId),
  });

  const isDisabled =
    !newMenu.name ||
    !newMenu.price ||
    !newMenu.menuCategoryIds.length ||
    !newMenu.locationId;

  const validMenuCategories = getMenuCategoriesByLocationId(
    selectedLocationId,
    menuCategories,
    menusMenuCategoriesLocations
  );

  const mappedValidMenuCategories = validMenuCategories.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const onFileSelected = (acceptedFile: File[]) => {
    setMenuImage(acceptedFile);
  };

  const handleCreateMenu = async () => {
    if (menuImage.length) {
      const formData = new FormData();
      formData.append("file", menuImage[0]);
      const response = await fetch(`${config.apiBaseUrl}/assets`, {
        method: "POST",
        body: formData,
      });
      const responseJson = await response.json();
      const assetUrl = responseJson.assetUrl;
      newMenu.assetUrl = assetUrl;
    } else {
      newMenu.assetUrl =
        "https://i.pinimg.com/236x/d9/8b/75/d98b759fea5cb754165ca7d26435cebc.jpg";
    }
    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
    const createdMenu = await response.json();
    dispatch(addMenu(createdMenu));
    dispatch(fetchMenusMenuCategoriesLocations(selectedLocationId));
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center" }}>Create New Menu</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          onChange={(event) =>
            setNewMenu({ ...newMenu, name: event.target.value })
          }
          placeholder="Name"
        />
        <TextField
          onChange={(event) =>
            setNewMenu({ ...newMenu, price: Number(event.target.value) })
          }
          sx={{ my: "1.5rem" }}
          type="number"
          placeholder="Price"
        />
        <SelectMenuCategories
          options={mappedValidMenuCategories}
          onChange={(values) =>
            setNewMenu({
              ...newMenu,
              menuCategoryIds: values.map((item) => item.id),
            })
          }
        />
        <Box sx={{ mt: "1.5rem" }}>
          <FileDropZone onFileSelected={onFileSelected} />
          <Box>
            {menuImage.map((image) => {
              return (
                <Chip
                  key={image.name}
                  label={image.name.split(".")[0]}
                  onDelete={() => {
                    const filteredMenuImage = menuImage.filter(
                      (item) => item.name !== image.name
                    );
                    setMenuImage(filteredMenuImage);
                  }}
                />
              );
            })}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isDisabled}
          sx={{ mx: "auto", mb: "0.6rem" }}
          onClick={handleCreateMenu}
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewMenu;
