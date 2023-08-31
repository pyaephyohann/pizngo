import { config } from "@/config";
import { useAppDispatch } from "@/store/hooks";
import { addTable } from "@/store/slices/tablesSlice";
import { getSelectedLocationId } from "@/utils/client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { table } from "console";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  setOpenSuccessAlert: (value: boolean) => void;
}

const NewTable = ({ open, setOpen, setOpenSuccessAlert }: Props) => {
  const selectedLocationId = getSelectedLocationId();

  const [newTable, setNewTable] = useState({
    name: "",
    locationId: selectedLocationId,
  });

  const dispatch = useAppDispatch();

  const handleCreateTable = async () => {
    const response = await fetch(`${config.apiBaseUrl}/tables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTable),
    });
    const createdTable = await response.json();
    dispatch(addTable(createdTable));
    setOpen(false);
    if (response.status === 200) {
      setOpenSuccessAlert(true);
    }
  };

  const isDisabled = !newTable.name;

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ textAlign: "center", mt: "0.5rem" }}>
        Create New Table
      </DialogTitle>
      <DialogContent>
        <TextField
          onChange={(event) =>
            setNewTable({ ...newTable, name: event.target.value })
          }
          sx={{ width: "15rem", my: "0.5rem" }}
          placeholder="Name"
          label="Name"
        />
      </DialogContent>
      <DialogActions sx={{ mb: "0.5rem" }}>
        <Button
          onClick={handleCreateTable}
          disabled={isDisabled}
          sx={{ mx: "auto" }}
          variant="contained"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTable;
