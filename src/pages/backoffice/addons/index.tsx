import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getAddonsByLocationId, getSelectedLocationId } from "@/utils/client";
import { Box, Button } from "@mui/material";
import EggIcon from "@mui/icons-material/Egg";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import NewAddon from "./NewAddon";
import Loading from "@/components/Loading";
import SuccessAlert from "@/components/SuccessAlert";

const Addons = () => {
  const {
    isLoading,
    addons,
    menusAddonCategories,
    menusMenuCategoriesLocations,
  } = useAppSelector(appData);

  const selectedLocationId = getSelectedLocationId() as string;

  const [open, setOpen] = useState<boolean>(false);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const validAddons = getAddonsByLocationId(
    addons,
    menusAddonCategories,
    menusMenuCategoriesLocations,
    selectedLocationId
  );

  if (isLoading) return <Loading />;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          New Addon
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", mt: "1rem" }}>
        {validAddons.map((item) => {
          return (
            <ItemCard
              key={item.id}
              icon={
                <EggIcon sx={{ fontSize: "2.5rem", color: "secondary.main" }} />
              }
              href={`/backoffice/addons/${item.id}`}
              title={item.name}
              subTitle={`${item.price} Kyats`}
            />
          );
        })}
      </Box>
      <NewAddon
        open={open}
        setOpen={setOpen}
        setOpenSuccessAlert={setOpenSuccessAlert}
      />
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message="New addon created successfully"
      />
    </Box>
  );
};

export default Addons;
