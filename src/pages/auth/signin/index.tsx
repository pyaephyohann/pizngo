import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <Box>
      <Button
        onClick={() => signIn("google", { callbackUrl: "/backoffice" })}
        variant="contained"
      >
        Sign In With Google
      </Button>
    </Box>
  );
};

export default SignIn;
