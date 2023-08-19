import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAddon } from "@/store/slices/addonsSlice";
import { appData } from "@/store/slices/appSlice";
import {
  getAddonCategoriesByLocationId,
  getSelectedLocationId,
} from "@/utils/client";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Addons } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditAddon = () => {
  const router = useRouter();
  const addonId = router.query.id;

  const {
    addons,
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations,
  } = useAppSelector(appData);

  const dispatch = useAppDispatch();

  const selectedLocationId = getSelectedLocationId() as string;

  const validAddonCategories = getAddonCategoriesByLocationId(
    addonCategories,
    menusAddonCategories,
    menusMenuCategoriesLocations,
    selectedLocationId
  );

  const [addon, setAddon] = useState<Addons>();

  const handleUpdateAddon = async () => {
    const response = await fetch(`${config.apiBaseUrl}/addons`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addon),
    });
    const updatedAddon = await response.json();
    dispatch(updateAddon(updatedAddon));
  };

  useEffect(() => {
    if (addons.length) {
      const validAddon = addons.find((item) => item.id === Number(addonId));
      setAddon(validAddon);
    }
  }, [addonId, addons]);

  if (!addon) return <Box>Addon not found</Box>;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "2rem",
        }}
      >
        <TextField
          onChange={(event) => setAddon({ ...addon, name: event.target.value })}
          sx={{ width: "15rem" }}
          defaultValue={addon.name}
          placeholder="Name"
          label="Name"
        />
        <TextField
          onChange={(event) =>
            setAddon({ ...addon, price: Number(event.target.value) })
          }
          sx={{ my: "2rem", width: "15rem" }}
          defaultValue={addon.price}
          placeholder="Price"
          label="Price"
          type="number"
        />
        <FormControl sx={{ width: "15rem" }}>
          <InputLabel>Addon Category</InputLabel>
          <Select
            defaultValue={addon.addonCategoryId}
            label="Addon Category"
            onChange={(event) =>
              setAddon({
                ...addon,
                addonCategoryId: Number(event.target.value),
              })
            }
          >
            {validAddonCategories.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Button
          onClick={handleUpdateAddon}
          variant="contained"
          sx={{ mt: "2rem" }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default EditAddon;
