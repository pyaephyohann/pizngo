import { useAppDispatch } from "@/store/hooks";
import { fetchAppData } from "@/store/slices/appSlice";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import OrderAppHeader from "./OrderAppHeader";

interface Props {
  children: string | JSX.Element | JSX.Element[];
}

const OrderAppLayout = ({ children }: Props) => {
  const { query, isReady } = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isReady) {
      dispatch(fetchAppData({ locationId: query.locationId as string }));
    }
  }, [dispatch, isReady, query.locationId]);

  return (
    <Box>
      <OrderAppHeader />
      <Box>{children}</Box>
    </Box>
  );
};

export default OrderAppLayout;
