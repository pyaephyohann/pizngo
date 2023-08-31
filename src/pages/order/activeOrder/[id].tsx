import Loading from "@/components/Loading";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { emptyCart } from "@/store/slices/cartSlice";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ActiveOrder = () => {
  const router = useRouter();
  const { query, isReady } = router;

  const orderId = query.id;
  const { isLoading, orders } = useAppSelector(appData);

  const dispatch = useAppDispatch();

  const order = orders.find((item) => item.id === Number(orderId));

  useEffect(() => {
    if (isReady && !order) {
      router.push({ pathname: "/order", query });
    }
  }, [isReady, order, query, router]);

  useEffect(() => {
    dispatch(emptyCart());
  }, [dispatch]);

  if (isLoading) return <Loading />;

  if (!order) return null;

  return (
    <Box>
      <Typography sx={{ mt: "3rem", fontSize: "3rem", textAlign: "center" }}>
        Thank you for your order. Please use animation
      </Typography>
    </Box>
  );
};

export default ActiveOrder;
