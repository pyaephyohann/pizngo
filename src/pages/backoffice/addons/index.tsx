import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getAddonsByLocationId, getSelectedLocationId } from "@/utils/client";
import { Box } from "@mui/material";
import EggIcon from "@mui/icons-material/Egg";

const Addons = () => {
  const { addons, menusAddonCategories, menusMenuCategoriesLocations } =
    useAppSelector(appData);

  const selectedLocationId = getSelectedLocationId() as string;

  const validAddons = getAddonsByLocationId(
    addons,
    menusAddonCategories,
    menusMenuCategoriesLocations,
    selectedLocationId
  );

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {validAddons.map((item) => {
          return (
            <ItemCard
              key={item.id}
              icon={<EggIcon sx={{ fontSize: "2.5rem" }} />}
              href={`backoffice/addons/${item.id}`}
              title={item.name}
              subTitle={`${item.price} Kyats`}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Addons;
