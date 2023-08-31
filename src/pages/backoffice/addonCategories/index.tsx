import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Box, Button } from "@mui/material";
import ClassIcon from "@mui/icons-material/Class";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import NewAddonCategory from "./NewAddonCategory";
import Loading from "@/components/Loading";
import SuccessAlert from "@/components/SuccessAlert";

const AddonCategories = () => {
  const selectedLocationId = getSelectedLocationId();

  const {
    isLoading,
    menusMenuCategoriesLocations,
    menus,
    menusAddonCategories,
    addonCategories,
    addons,
  } = useAppSelector(appData);

  const [open, setOpen] = useState<boolean>(false);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const validMenuIds = menusMenuCategoriesLocations
    .filter(
      (item) => item.menuId && item.locationId === Number(selectedLocationId)
    )
    .map((item) => item.menuId);

  const validAddonCategoryIds = menusAddonCategories
    .filter((item) => validMenuIds.includes(item.menuId))
    .map((item) => item.addonCategoryId);

  const validAddonCategories = addonCategories.filter((item) =>
    validAddonCategoryIds.includes(item.id)
  );

  const getAddonsCount = (addonCategoryId?: number) => {
    if (!addonCategoryId) return 0;
    return addons.filter((item) => item.addonCategoryId === addonCategoryId)
      .length;
  };

  if (isLoading) return <Loading />;

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
          variant="contained"
          startIcon={<AddIcon />}
        >
          New Addon Category
        </Button>
      </Box>
      <Box sx={{ display: "flex" }}>
        {validAddonCategories.map((item) => {
          return (
            <ItemCard
              key={item.id}
              icon={
                <ClassIcon
                  sx={{ fontSize: "2.5rem", color: "secondary.main" }}
                />
              }
              title={item.name}
              href={`/backoffice/addonCategories/${item.id}`}
              subTitle={`${getAddonsCount(item.id)} addons`}
            />
          );
        })}
      </Box>
      <NewAddonCategory
        open={open}
        setOpen={setOpen}
        setOpenSuccessAlert={setOpenSuccessAlert}
      />
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message="New addon category created successfully"
      />
    </Box>
  );
};

export default AddonCategories;
