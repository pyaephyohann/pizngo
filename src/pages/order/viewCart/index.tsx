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
import { getCartTotalPrice } from "@/utils/client";
import Image from "next/image";

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
      <Box
        sx={{ display: "flex", flexWrap: "wrap", color: "white", mt: "0.5rem" }}
      >
        {cart.map((cartItem) => {
          return (
            <Box
              key={cartItem.id}
              sx={{
                width: "15rem",
                bgcolor: "primary.main",
                borderRadius: "1rem",
                p: "1.5rem",
                m: "1.5rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mb: "1.3rem",
                }}
              >
                <IconButton
                  sx={{ mr: "2rem", bgcolor: "secondary.main" }}
                  onClick={() => {
                    router.push({
                      pathname: `/order/menuUpdate/${cartItem.id}`,
                      query,
                    });
                  }}
                >
                  <ModeEditIcon sx={{ color: "white" }} />
                </IconButton>
                <IconButton
                  sx={{ bgcolor: "secondary.main" }}
                  onClick={() => handleRemoveFromCart(cartItem)}
                >
                  <DeleteIcon sx={{ color: "white" }} />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: "1rem",
                }}
              >
                <Typography>{cartItem.menu.name}</Typography>
                <Typography>{cartItem.menu.price} Ks</Typography>
              </Box>
              <Box sx={{ display: "flex", mt: "1rem" }}>
                <Typography sx={{ mr: "2rem" }}>Quantity</Typography>
                <Typography>{cartItem.quantity}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "center", mt: "1.3rem" }}
              >
                <Image
                  src={cartItem.menu.assetUrl as string}
                  alt="Menu"
                  width={200}
                  height={200}
                  style={{ borderRadius: "2rem" }}
                />
              </Box>
              <Box sx={{ mt: "2rem" }}>
                {cartItem.addons.map((addon) => {
                  return (
                    <Box
                      key={addon.id}
                      sx={{
                        display: "flex",
                        my: "0.5rem",
                      }}
                    >
                      <Typography sx={{ mr: "2rem" }}>{addon.name}</Typography>
                      <Typography>{addon.price} Ks</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box>
        <Typography variant="h5" sx={{ textAlign: "center", mt: "2rem" }}>
          Total Price : {getCartTotalPrice(cart)} Ks
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", my: "3rem" }}>
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
