import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addAddon } from "@/store/slices/addonsSlice";
import { appData } from "@/store/slices/appSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AddonCategories } from "@prisma/client";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const NewAddon = ({ open, setOpen }: Props) => {
  const { addonCategories } = useAppSelector(appData);

  const dispatch = useAppDispatch();

  const [newAddon, setNewAddon] = useState({
    name: "",
    price: 0,
    addonCategoryId: "",
  });

  const handleCreateAddon = async () => {
    const response = await fetch(`${config.apiBaseUrl}/addons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAddon),
    });
    const createdAddon = await response.json();
    dispatch(addAddon(createdAddon));
    setNewAddon({ ...newAddon, name: "" });
    setOpen(false);
  };

  const isDisabled = !newAddon.name || !newAddon.addonCategoryId;

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center", mt: "0.5rem" }}>
        Create New Addon
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", width: "20rem" }}
      >
        <TextField
          onChange={(event) =>
            setNewAddon({ ...newAddon, name: event.target.value })
          }
          placeholder="Name"
          label="Name"
        />
        <TextField
          sx={{ my: "2rem" }}
          onChange={(event) =>
            setNewAddon({ ...newAddon, price: Number(event.target.value) })
          }
          placeholder="Price"
          label="Price"
          type="number"
        />
        <FormControl fullWidth>
          <InputLabel>Addon Category</InputLabel>
          <Select
            value={newAddon.addonCategoryId}
            label="Addon Category"
            onChange={(event) =>
              setNewAddon({ ...newAddon, addonCategoryId: event.target.value })
            }
          >
            {addonCategories.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ mb: "0.8rem" }}>
        <Button
          disabled={isDisabled}
          sx={{ mx: "auto" }}
          onClick={handleCreateAddon}
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewAddon;
