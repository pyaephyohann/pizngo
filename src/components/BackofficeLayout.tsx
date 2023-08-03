import { useAppDispatch } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/appSlice";
import { Box } from "@mui/material";
import { useEffect } from "react";

interface Props {
  title?: string;
  children: string | JSX.Element | JSX.Element[];
}

const BackofficeLayout = ({ title, children }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAppData({ locationId: undefined }));
  }, [dispatch]);
  return (
    <Box>
      <Box>This is backoffice layout</Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default BackofficeLayout;
