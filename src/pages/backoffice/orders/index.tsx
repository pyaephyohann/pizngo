import { Box, Button } from "@mui/material";
import { signOut } from "next-auth/react";

const Orders = () => {
  return (
    <Box>
      <Button
        onClick={() => signOut({ callbackUrl: "/auth/signin" })}
        variant="contained"
      >
        Sign Out
      </Button>
    </Box>
  );
};

export default Orders;
