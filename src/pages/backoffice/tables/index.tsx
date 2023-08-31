import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Box, Button } from "@mui/material";
import TableBarIcon from "@mui/icons-material/TableBar";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import NewTable from "./NewTable";
import Loading from "@/components/Loading";
import SuccessAlert from "@/components/SuccessAlert";

const Tables = () => {
  const { isLoading, tables } = useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId();

  const [open, setOpen] = useState<boolean>(false);

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);

  const validTables = tables.filter(
    (item) => item.locationId === Number(selectedLocationId)
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
      <NewTable
        open={open}
        setOpen={setOpen}
        setOpenSuccessAlert={setOpenSuccessAlert}
      />
      <SuccessAlert
        open={openSuccessAlert}
        setOpen={setOpenSuccessAlert}
        message="New table created successfully"
      />
    </Box>
  );
};

export default Tables;
