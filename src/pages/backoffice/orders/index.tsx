import BackofficeLayout from "@/components/BackofficeLayout";
import { Box, Button } from "@mui/material";
import { signOut } from "next-auth/react";

const Orders = () => {
  return (
    <BackofficeLayout>
      <Box>
        <Button
          onClick={() => signOut({ callbackUrl: "/auth/signin" })}
          variant="contained"
        >
          Sign Out
        </Button>
      </Box>
    </BackofficeLayout>
  );
};

export default Orders;
