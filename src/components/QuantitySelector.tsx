import { Box, IconButton, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

interface Props {
  value: number;
  onQuantityIncrease: () => void;
  onQuantityDecrease: () => void;
}

const QuantitySelector = ({
  value,
  onQuantityDecrease,
  onQuantityIncrease,
}: Props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton onClick={onQuantityDecrease}>
        <RemoveCircleIcon sx={{ fontSize: "1.8rem", color: "#00DFA2" }} />
      </IconButton>
      <Typography sx={{ mx: "1rem", fontSize: "1.6rem" }}>{value}</Typography>
      <IconButton onClick={onQuantityIncrease}>
        <AddCircleIcon sx={{ fontSize: "1.8rem", color: "#00DFA2" }} />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;
