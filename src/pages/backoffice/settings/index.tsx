import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { updateCompany } from "@/store/slices/companySlice";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Companies } from "@prisma/client";
import { useEffect, useState } from "react";

const Settings = () => {
  const { company } = useAppSelector(appData);
  const [newCompany, setNewCompany] = useState<Companies>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (company) setNewCompany(company);
  }, [company]);

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

  if (!company) return null;
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "15rem",
          mt: "1rem",
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
    </Box>
  );
};

export default Settings;
