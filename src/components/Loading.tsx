import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: "5rem",
      }}
    >
      <CircularProgress />;
    </Box>
  );
};

export default Loading;
