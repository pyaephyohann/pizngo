import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { addLocation } from "@/store/slices/locationsSlice";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  setOpenSuccessAlert: (value: boolean) => void;
}

const NewLocation = ({ open, setOpen, setOpenSuccessAlert }: Props) => {
  const { company } = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    companyId: company?.id,
  });

  const isDisabled = newLocation.name && newLocation.address ? false : true;

  const handleCreateNewLocation = async () => {
    newLocation.companyId = company?.id;
    const response = await fetch(`${config.apiBaseUrl}/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    });
    const createdLocation = await response.json();
    dispatch(addLocation(createdLocation));
    setOpen(false);
    setNewLocation({
      name: "",
      address: "",
      companyId: company?.id,
    });
    if (response.status === 200) {
      setOpenSuccessAlert(true);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center" }}>
        Create New Location
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          onChange={(event) =>
            setNewLocation({ ...newLocation, name: event.target.value })
          }
          placeholder="Name"
        />
        <TextField
          onChange={(event) =>
            setNewLocation({ ...newLocation, address: event.target.value })
          }
          sx={{ my: "1.5rem" }}
          placeholder="Address"
        />
      </DialogContent>
      <DialogActions sx={{ mb: "0.5rem" }}>
        <Button
          onClick={handleCreateNewLocation}
          disabled={isDisabled}
          sx={{ width: "fit-content", mx: "auto" }}
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewLocation;
