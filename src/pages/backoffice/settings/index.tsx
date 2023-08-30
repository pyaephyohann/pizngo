import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData, selectLocations } from "@/store/slices/appSlice";
import { updateCompany } from "@/store/slices/companySlice";
import { getSelectedLocationId } from "@/utils/client";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Companies, Locations } from "@prisma/client";
import { useEffect, useState } from "react";

const Settings = () => {
  const { company, locations } = useAppSelector(appData);
  const [newCompany, setNewCompany] = useState<Companies>();
  const [selectedLocation, setSelectedLocation] = useState<Locations>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (locations.length) {
      const selectedLocationId = getSelectedLocationId();
      if (!selectedLocationId) {
        localStorage.setItem("selectedLocationId", String(locations[0].id));
        setSelectedLocation(locations[0]);
      } else {
        const selectedLocation = locations.find(
          (item) => item.id === Number(selectedLocationId)
        );
        setSelectedLocation(selectedLocation);
      }
    }
    if (company) setNewCompany(company);
  }, [company, locations]);

  const isDisabled = newCompany?.name && newCompany?.address ? false : true;

  const handleUpdateCompany = async () => {
    const response = await fetch(`${config.apiBaseUrl}/companies`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCompany),
    });
    const updatedCompany = await response.json();
    dispatch(updateCompany(updatedCompany));
  };

  const handleSelectLocation = (event: SelectChangeEvent<number>) => {
    localStorage.setItem("selectedLocationId", String(event.target.value));
    const selectedLocation = locations.find(
      (item) => item.id === event.target.value
    );
    setSelectedLocation(selectedLocation);
  };

  if (!company) return null;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        mt: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "15rem",
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center", mb: "1.5rem" }}>
          Your Company
        </Typography>
        <TextField
          onChange={(event) =>
            newCompany &&
            setNewCompany({ ...newCompany, name: event.target.value })
          }
          defaultValue={company.name}
          placeholder="Name"
        />
        <TextField
          onChange={(event) =>
            newCompany &&
            setNewCompany({ ...newCompany, address: event.target.value })
          }
          sx={{ my: "1.5rem" }}
          defaultValue={company.address}
          placeholder="Address"
        />
        <Button
          onClick={handleUpdateCompany}
          disabled={isDisabled}
          sx={{ width: "fit-content", mx: "auto" }}
          variant="contained"
        >
          Update
        </Button>
      </Box>
      <Box sx={{ width: "15rem" }}>
        <Typography sx={{ mb: "2.5rem" }} variant="h5">
          Select Your Location
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Locations</InputLabel>
          <Select
            defaultValue={selectedLocation.id}
            label="Locations"
            onChange={handleSelectLocation}
          >
            {locations.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Settings;
