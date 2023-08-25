import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Box, Button } from "@mui/material";
import TableBarIcon from "@mui/icons-material/TableBar";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import NewTable from "./NewTable";

const Tables = () => {
  const { tables } = useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId();

  const [open, setOpen] = useState<boolean>(false);

  const validTables = tables.filter(
    (item) => item.locationId === Number(selectedLocationId)
  );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          New Table
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {validTables.map((item) => {
          return (
            <ItemCard
              key={item.id}
              icon={
                <TableBarIcon
                  sx={{ fontSize: "2.5rem", color: "secondary.main" }}
                />
              }
              title={item.name}
              href={`/backoffice/tables/${item.id}`}
            />
          );
        })}
      </Box>
      <NewTable open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Tables;
