import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Box, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import NewLocation from "./NewLocation";

const Locations = () => {
  const { locations } = useAppSelector(appData);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: "1rem" }}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Location
        </Button>
      </Box>
      <Box sx={{ display: "flex" }}>
        {locations.map((item) => {
          return (
            <ItemCard
              key={item.id}
              icon={<LocationOnIcon sx={{ fontSize: "2.5rem" }} />}
              title={item.name}
              href={`/backoffice/locations/${item.id}`}
            />
          );
        })}
      </Box>
      <NewLocation open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Locations;