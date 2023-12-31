import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteAddon, updateAddon } from "@/store/slices/addonsSlice";
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
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "@/components/DeleteDialog";
import Loading from "@/components/Loading";
import SuccessAlert from "@/components/SuccessAlert";

const EditAddon = () => {
  const router = useRouter();
  const addonId = router.query.id;

  const {
    isLoading,
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

  const [open, setOpen] = useState<boolean>(false);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

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
    if (response.status === 200) {
      setOpenSuccessAlert(true);
    }
  };

  const handleDeleteAddon = async () => {
    await fetch(`${config.apiBaseUrl}/addons?id=${addonId}`, {
      method: "DELETE",
    });
    addon && dispatch(deleteAddon(addon));
    router.push("/backoffice/addons");
  };

  useEffect(() => {
    if (addons.length) {
      const validAddon = addons.find((item) => item.id === Number(addonId));
      setAddon(validAddon);
    }
  }, [addonId, addons]);

  if (isLoading) return <Loading />;

  if (!addon) return <Box>Addon not found</Box>;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          onClick={() => setOpen(true)}
          color="error"
          variant="contained"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </Box>
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
      <DeleteDialog
        title="Are you sure you want to delete this addon?"
        open={open}
        setOpen={setOpen}
        callBack={handleDeleteAddon}
      />
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message="Addon updated successfully"
      />
    </Box>
  );
};

export default EditAddon;
