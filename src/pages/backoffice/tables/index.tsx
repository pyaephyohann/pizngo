import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils/client";
import { Box } from "@mui/material";
import TableBarIcon from "@mui/icons-material/TableBar";

const Tables = () => {
  const { tables } = useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId();

  const validTables = tables.filter(
    (item) => item.locationId === Number(selectedLocationId)
  );

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {validTables.map((item) => {
          return (
            <ItemCard
              key={item.id}
              icon={<TableBarIcon sx={{ fontSize: "2.5rem" }} />}
              title={item.name}
              href={`/backoffice/tables/${item.id}`}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Tables;
