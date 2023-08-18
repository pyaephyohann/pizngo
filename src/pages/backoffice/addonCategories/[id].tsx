import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteAddonCategory,
  updateAddonCategory,
} from "@/store/slices/addonCategoriesSlice";
import { appData } from "@/store/slices/appSlice";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { AddonCategories } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "@/components/DeleteDialog";

const EditAddonCategory = () => {
  const router = useRouter();
  const addonCategoryId = router.query.id;

  const { addonCategories } = useAppSelector(appData);

  const dispatch = useAppDispatch();

  const [addonCategory, setAddonCategory] = useState<AddonCategories>();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (addonCategories.length) {
      const addonCategory = addonCategories.find(
        (item) => item.id === Number(addonCategoryId)
      );
      setAddonCategory(addonCategory);
    }
  }, [addonCategories, addonCategoryId]);

  const handleUpdateAddonCategory = async () => {
    const response = await fetch(`${config.apiBaseUrl}/addonCategories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addonCategory),
    });
    const updatedAddonCategory = await response.json();
    const isEmptyUpdatedAddonCategory =
      Object.keys(updatedAddonCategory).length === 0;
    if (isEmptyUpdatedAddonCategory) return;
    dispatch(updateAddonCategory(updatedAddonCategory));
  };

  const handleDeleteAddonCategory = async () => {
    await fetch(`${config.apiBaseUrl}/addonCategories?id=${addonCategoryId}`, {
      method: "DELETE",
    });
    addonCategory && dispatch(deleteAddonCategory(addonCategory));
    router.push("/backoffice/addonCategories");
  };

  if (!addonCategory)
    return (
      <Box>
        <Typography>AddonCategory not found</Typography>
      </Box>
    );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="error"
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
          onChange={(event) =>
            setAddonCategory({ ...addonCategory, name: event.target.value })
          }
          placeholder="Name"
          defaultValue={addonCategory.name}
        />
        <FormControlLabel
          sx={{ my: "1.5rem" }}
          control={
            <Switch
              defaultChecked={addonCategory.isRequired}
              onChange={(event) =>
                setAddonCategory({
                  ...addonCategory,
                  isRequired: event.target.checked,
                })
              }
            />
          }
          label="Required"
        />
        <Button
          onClick={handleUpdateAddonCategory}
          sx={{ width: "fit-content", mx: "auto" }}
          variant="contained"
        >
          Update
        </Button>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        callBack={handleDeleteAddonCategory}
        title="Are you sure you want to delete this addon category?"
      />
    </Box>
  );
};

export default EditAddonCategory;
