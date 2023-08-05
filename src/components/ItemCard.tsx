import { Box, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  subTitle?: string;
}

const ItemCard = ({ icon, title, subTitle }: Props) => {
  return (
    <Box sx={{ m: "1.5rem" }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "11rem",
          height: "11rem",
        }}
        elevation={3}
      >
        <Box>{icon}</Box>
        <Box sx={{ mt: "1rem" }}>
          <Typography>{title}</Typography>
          {subTitle && <Typography>{subTitle}</Typography>}
        </Box>
      </Paper>
    </Box>
  );
};

export default ItemCard;
