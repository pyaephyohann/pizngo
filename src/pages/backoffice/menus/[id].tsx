import MenuImageEditDropZone from "@/components/MenuImageEditDropZone";
import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import {
  getAddonCategoriesByMenuId,
  getSelectedLocationId,
} from "@/utils/client";
import { Autocomplete, Box, Button, Checkbox, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { AddonCategories, Menus } from "@prisma/client";
import { fetchMenusAddonCategories } from "@/store/slices/menusAddonCategoriesSlice";
import { removeMenu, updateMenu } from "@/store/slices/menusSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "@/components/DeleteDialog";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocationsSlice";
import Loading from "@/components/Loading";
import SuccessAlert from "@/components/SuccessAlert";

const EditMenu = () => {
  const router = useRouter();
  const menuId = router.query.id as string;

  const dispatch = useAppDispatch();

  const selectedLocationId = getSelectedLocationId() as string;

  const { isLoading, menus, menusAddonCategories, addonCategories } =
    useAppSelector(appData);

  const menuIds = menus.map((item) => item.id);

  const [updatedMenuImage, setUpdatedMenuImage] = useState<string>("");

  const [menuToUpdate, setMenuToUpdate] = useState<Partial<Menus>>();

  const [open, setOpen] = useState<boolean>(false);

  const [openSuccessAlert, setOPenSuccessAlert] = useState(false);

  const onFileSelected = async (acceptedFile: File[]) => {
    const formData = new FormData();
    formData.append("file", acceptedFile[0]);
    const response = await fetch(`${config.apiBaseUrl}/assets`, {
      method: "POST",
      body: formData,
    });
    const responseJson = await response.json();
    const assetUrl = responseJson.assetUrl;
    setUpdatedMenuImage(assetUrl);
  };

  const selectedAddonCategories = getAddonCategoriesByMenuId(
    menuId,
    menusAddonCategories,
    addonCategories
  );

  const [updateSelectedAddonCategories, setUpdateSelectedAddonCategories] =
    useState<AddonCategories[]>([]);

  const menu = menus.find((item) => item.id === Number(menuId)) as Menus;

  const handleUpdateMenu = async () => {
    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...menuToUpdate,
        id: menuId,
        assetUrl: updatedMenuImage,
        addonCategoryIds: updateSelectedAddonCategories.map((item) => item.id),
      }),
    });
    const updatedMenu = await response.json();
    dispatch(fetchMenusAddonCategories(menuIds));
    const isEmptyUpdatedMenu = Object.keys(updatedMenu).length === 0;
    if (response.status === 200) {
      setOPenSuccessAlert(true);
    }
    if (isEmptyUpdatedMenu) return;
    dispatch(updateMenu(updatedMenu));
  };

  const handleDeleteMenu = async () => {
    await fetch(`${config.apiBaseUrl}/menus?menuId=${menuId}`, {
      method: "DELETE",
    });
    dispatch(removeMenu(menu));
    dispatch(fetchMenusMenuCategoriesLocations(selectedLocationId));
    router.push("/backoffice/menus");
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  if (isLoading) return <Loading />;

  if (!menu) return null;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
          mt: "2rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ mr: "5rem" }}>
          <Box>
            <TextField
              onChange={(event) =>
                setMenuToUpdate({ ...menuToUpdate, name: event.target.value })
              }
              sx={{ width: 300 }}
              label="Name"
              defaultValue={menu.name}
              placeholder="Name"
            />
          </Box>

          <Box sx={{ my: "2.5rem" }}>
            <TextField
              onChange={(event) =>
                setMenuToUpdate({
                  ...menuToUpdate,
                  price: Number(event.target.value),
                })
              }
              sx={{ width: 300 }}
              label="Price"
              type="number"
              defaultValue={menu.price}
              placeholder="Price"
            />
          </Box>
          <Box>
            <Autocomplete
              multiple
              defaultValue={selectedAddonCategories}
              options={addonCategories}
              disableCloseOnSelect
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={(event, values) => {
                setUpdateSelectedAddonCategories(values);
              }}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
                </li>
              )}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Addon Categories"
                  placeholder="Addon Categories"
                />
              )}
            />
          </Box>
          <Button
            sx={{ mt: "2.5rem" }}
            onClick={handleUpdateMenu}
            variant="contained"
          >
            Update
          </Button>
        </Box>

        <MenuImageEditDropZone
          onFileSelected={onFileSelected}
          menuAssetUrl={updatedMenuImage || menu.assetUrl || ""}
        />
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title="Are you sure you want to delete this menu"
        callBack={handleDeleteMenu}
      />
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOPenSuccessAlert}
        message="Menu updated successfully"
      />
    </Box>
  );
};

export default EditMenu;
