import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Box, Button } from "@mui/material";
import ClassIcon from "@mui/icons-material/Class";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import NewAddonCategory from "./NewAddonCategory";

const AddonCategories = () => {
  const selectedLocationId = getSelectedLocationId();

  const {
    menusMenuCategoriesLocations,
    menus,
    menusAddonCategories,
    addonCategories,
    addons,
  } = useAppSelector(appData);

  const [open, setOpen] = useState<boolean>(false);

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
              icon={<ClassIcon sx={{ fontSize: "2.5rem" }} />}
              title={item.name}
              href={`/backoffice/addonCategories/${item.id}`}
              subTitle={`${getAddonsCount(item.id)} addons`}
            />
          );
        })}
      </Box>
      <NewAddonCategory open={open} setOpen={setOpen} />
    </Box>
  );
};

export default AddonCategories;
