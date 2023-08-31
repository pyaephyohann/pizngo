import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { deleteTable, updateTable } from "@/store/slices/tablesSlice";
import { Box, Button, TextField } from "@mui/material";
import { Tables } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "@/components/DeleteDialog";
import Loading from "@/components/Loading";

const EditTable = () => {
  const router = useRouter();
  const tableId = router.query.id;
  const { isLoading, tables } = useAppSelector(appData);

  const dispatch = useAppDispatch();

  const table = tables.find((item) => item.id === Number(tableId)) as Tables;

  const [tableName, setTableName] = useState(table?.name);

  const [open, setOpen] = useState<boolean>(false);

  const handleUpdateTable = async () => {
    const response = await fetch(`${config.apiBaseUrl}/tables`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: tableName, id: Number(tableId) }),
    });
    const updatedTable = await response.json();
    const isEmptyUpdatedTable = Object.keys(updatedTable).length === 0;
    if (isEmptyUpdatedTable) return;
    dispatch(updateTable(updatedTable));
  };

  const handleDeleteTable = async () => {
    await fetch(`${config.apiBaseUrl}/tables?id=${tableId}`, {
      method: "DELETE",
    });
    dispatch(deleteTable(table));
    router.push("/backoffice/tables");
  };

  if (isLoading) return <Loading />;

  if (!table) return <Box>Table not found</Box>;

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
          alignItems: "center",
          mt: "2rem",
        }}
      >
        <TextField
          onChange={(event) => setTableName(event.target.value)}
          sx={{ mb: "2rem" }}
          defaultValue={table.name}
          placeholder="Name"
          label="Name"
        />
        <Button onClick={handleUpdateTable} variant="contained">
          Update
        </Button>
      </Box>
      <DeleteDialog
        title="Are you sure you want to delete this table"
        open={open}
        setOpen={setOpen}
        callBack={handleDeleteTable}
      />
    </Box>
  );
};

export default EditTable;
