import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import {
  getNumberOfMenusByOrderId,
  getOrderlinesByOrderId,
  getSelectedLocationId,
} from "@/utils/client";
import {
  Box,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { AddonCategories, Addons, OrderStatus, Orders } from "@prisma/client";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Orders = () => {
  const { orders, orderlines, addons, addonCategories, menus } =
    useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId();
  const currentLocationOrders = orders.filter(
    (item) => item.locationId === Number(selectedLocationId)
  );

  interface Props {
    order: Orders;
  }

  const Row = ({ order }: Props) => {
    const [open, setOpen] = useState(false);

    const RenderOrderlines = () => {
      const validOrderlines = getOrderlinesByOrderId(
        order.id,
        orderlines,
        menus,
        addons,
        addonCategories
      );

      return (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {validOrderlines.map((item) => {
            return (
              <Box
                key={item.menu.id}
                sx={{ width: "15rem", p: "1rem", mr: "1.5rem" }}
              >
                {/* show menu name and quantity */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: "0.6rem",
                  }}
                >
                  <Typography sx={{ fontSize: "1.5rem" }}>
                    {item.menu.name}
                  </Typography>
                  <Typography
                    sx={{
                      py: "0.2rem",
                      px: "0.8rem",
                      bgcolor: "secondary.main",
                      borderRadius: "5rem",
                      color: "white",
                    }}
                  >
                    {item.quantity}
                  </Typography>
                </Box>
                {/* show addons with addonCategory */}
                <Box sx={{ height: "16rem", overflowY: "scroll" }}>
                  {Object.keys(item.addonWithCategories).map((key) => {
                    const addonCategory = addonCategories.find(
                      (item) => item.id === Number(key)
                    ) as AddonCategories;
                    const orderlineAddons =
                      item.addonWithCategories[addonCategory.id];
                    return (
                      <Box key={key} sx={{ my: "1rem" }}>
                        {/* show addonCategory name */}
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "1.3rem",
                            mb: "0.5rem",
                          }}
                        >
                          {addonCategory.name}
                        </Typography>
                        {/* show addons */}
                        {orderlineAddons.map((addon) => {
                          return (
                            <Typography sx={{ my: "0.3rem" }} key={addon.id}>
                              {addon.name}
                            </Typography>
                          );
                        })}
                      </Box>
                    );
                  })}
                </Box>
                {/* show status */}
                <Box sx={{ mt: "1rem" }}>
                  <FormControl sx={{ width: "80%" }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      defaultValue={item.status}
                      label="Status"
                      onChange={() => {}}
                    >
                      <MenuItem value={OrderStatus.PENDING}>Pending</MenuItem>
                      <MenuItem value={OrderStatus.PREPARING}>
                        Preparing
                      </MenuItem>
                      <MenuItem value={OrderStatus.COMPLETE}>Complete</MenuItem>
                      <MenuItem value={OrderStatus.REJECTED}>Rejected</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            );
          })}
        </Box>
      );
    };

    return (
      <>
        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
          <TableCell align="center">
            <IconButton onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {order.id}
          </TableCell>
          <TableCell align="center">
            {getNumberOfMenusByOrderId(order.id, orderlines)}
          </TableCell>
          <TableCell align="center">{order.tableId}</TableCell>
          <TableCell align="center">{order.isPaid ? "Yes" : "No"}</TableCell>
          <TableCell align="center">{order.price}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: "0", paddingTop: "0" }}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {<RenderOrderlines />}
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" />
              <TableCell align="center">Order Id</TableCell>
              <TableCell align="center">No of menus</TableCell>
              <TableCell align="center">Table</TableCell>
              <TableCell align="center">Paid</TableCell>
              <TableCell align="center">Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentLocationOrders.map((order) => (
              <Row order={order} key={order.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Orders;
