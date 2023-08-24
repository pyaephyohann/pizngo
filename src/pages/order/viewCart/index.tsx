import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartItem, removeFromCart } from "@/store/slices/cartSlice";
import { config } from "@/config";
import { addOrder } from "@/store/slices/ordersSlice";

const ViewCart = () => {
  const router = useRouter();
  const query = router.query;
  const { cart } = useAppSelector(appData);

  const dispatch = useAppDispatch();

  const handleRemoveFromCart = (cartItem: CartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const { locationId, tableId } = query;

  const isDisabeld = !locationId || !tableId;

  const handleConfirmOrder = async () => {
    const response = await fetch(
      `${config.apiBaseUrl}/app?locationId=${locationId}&tableId=${tableId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      }
    );
    const createdOrder = await response.json();
    dispatch(addOrder(createdOrder));
    router.push({ pathname: `/order/activeOrder/${createdOrder.id}`, query });
  };

  useEffect(() => {
    if (!cart.length) {
      const isValid = query.locationId && query.tableId;
      isValid && router.push({ pathname: "/order", query });
    }
  }, [cart, query, router]);

  return (
    <Box sx={{ mt: "1.5rem" }}>
      <Typography sx={{ fontSize: "2rem", textAlign: "center" }}>
        Review Your Cart
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "4rem" }}>
        {cart.map((cartItem) => {
          return (
            <Box key={cartItem.id} sx={{ mx: "4rem" }}>
              <Box sx={{ display: "flex", mb: "1.5rem", alignItems: "center" }}>
                <Typography variant="h5" sx={{ mr: "1rem" }}>
                  {cartItem.menu.name}
                </Typography>
                <Typography
                  sx={{
                    bgcolor: "#00DFA2",
                    borderRadius: "5rem",
                    px: "0.5rem",
                    py: "0.1rem",
                    color: "white",
                  }}
                >
                  {cartItem.quantity}
                </Typography>
              </Box>
              <Box>
                {cartItem.addons.map((addon) => {
                  return (
                    <Typography sx={{ my: "0.5rem" }} key={addon.id}>
                      {addon.name}
                    </Typography>
                  );
                })}
              </Box>
              <Box sx={{ mt: "1rem" }}>
                <IconButton
                  sx={{ mr: "0.5rem" }}
                  onClick={() => {
                    router.push({
                      pathname: `/order/menuUpdate/${cartItem.id}`,
                      query,
                    });
                  }}
                >
                  <ModeEditIcon sx={{ color: "#00DFA2" }} />
                </IconButton>
                <IconButton onClick={() => handleRemoveFromCart(cartItem)}>
                  <DeleteIcon sx={{ color: "#00DFA2" }} />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "3rem" }}>
        <Button
          disabled={isDisabeld}
          onClick={handleConfirmOrder}
          variant="contained"
        >
          Confirm Order
        </Button>
      </Box>
    </Box>
  );
};

export default ViewCart;
