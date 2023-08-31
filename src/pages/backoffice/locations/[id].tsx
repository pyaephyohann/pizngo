import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { removeLocation, updateLocation } from "@/store/slices/locationsSlice";
import { Box, Button, TextField } from "@mui/material";
import { Locations } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "@/components/DeleteDialog";
import Loading from "@/components/Loading";

const EditLocation = () => {
  const router = useRouter();
  const locationId = router.query.id;
  const [location, setLocation] = useState<Locations>();
  const { isLoading, locations } = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (locations.length) {
      const currentLocation = locations.find(
        (item) => item.id === Number(locationId)
      );
      setLocation(currentLocation);
    }
  }, [locationId, locations]);

  const isDisabled = location?.name && location?.address ? false : true;

  const handleUpdateLocation = async () => {
    const response = await fetch(`${config.apiBaseUrl}/locations`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(location),
    });
    const updatedLocation = await response.json();
    dispatch(updateLocation(updatedLocation));
  };

  const handleDeleteLocation = async () => {
    await fetch(`${config.apiBaseUrl}/locations?id=${Number(locationId)}`, {
      method: "DELETE",
    });
    location && dispatch(removeLocation(location));
    router.push("/backoffice/locations");
  };

  if (isLoading) return <Loading />;

  if (!location) return null;

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
          display: "flex",
          flexDirection: "column",
          width: "20rem",
          ml: "2rem",
          mt: "1rem",
        }}
      >
        <TextField
          onChange={(event) =>
            location && setLocation({ ...location, name: event.target.value })
          }
          defaultValue={location.name}
          placeholder="Name"
        />
        <TextField
          onChange={(event) =>
            location &&
            setLocation({ ...location, address: event.target.value })
          }
          sx={{ my: "1.5rem" }}
          defaultValue={location.address}
          placeholder="Address"
        />
        <Button
          onClick={handleUpdateLocation}
          disabled={isDisabled}
          sx={{ width: "fit-content", mx: "auto" }}
          variant="contained"
        >
          Update
        </Button>
      </Box>
      <DeleteDialog
        title="Are you sure you want to delete this location"
        open={open}
        setOpen={setOpen}
        callBack={handleDeleteLocation}
      />
    </Box>
  );
};

export default EditLocation;
