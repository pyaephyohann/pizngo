import { config } from "@/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { updateTable } from "@/store/slices/tablesSlice";
import { Box, Button, TextField } from "@mui/material";
import { Tables } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";

const EditTable = () => {
  const router = useRouter();
  const tableId = router.query.id;
  const { tables } = useAppSelector(appData);

  const dispatch = useAppDispatch();

  const table = tables.find((item) => item.id === Number(tableId)) as Tables;

  const [tableName, setTableName] = useState(table?.name);

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

  if (!table) return <Box>Table not found</Box>;

  return (
    <Box>
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
    </Box>
  );
};

export default EditTable;
