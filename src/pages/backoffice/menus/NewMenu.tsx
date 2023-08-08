import FileDropZone from "@/components/FileDropZone";
import SelectMenuCategories from "@/components/SelectMenuCategories";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
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
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { Menus } from "@prisma/client";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewMenu = ({ open, setOpen }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File[]>();
  const { menuCategories, menusMenuCategoriesLocations } =
    useAppSelector(appData);

  const selectedLocationId = getSelectedLocationId() as string;

  const [newMenu, setNewMenu] = useState({
    name: "",
    price: 0,
    assetUrl: "",
    menuCategoryIds: [] as number[],
    locationId: selectedLocationId,
  });

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
    setSelectedFile(acceptedFile);
  };

  const handleCreateMenu = () => {
    console.log(newMenu);
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
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
