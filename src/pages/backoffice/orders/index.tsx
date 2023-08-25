import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import {
  getNumberOfMenusByOrderId,
  getSelectedLocationId,
} from "@/utils/client";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Orders } from "@prisma/client";
import { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Orders = () => {
  const { orders, orderlines } = useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId();
  const currentLocationOrders = orders.filter(
    (item) => item.locationId === Number(selectedLocationId)
  );

  interface Props {
    order: Orders;
  }

  const Row = ({ order }: Props) => {
    const [open, setOpen] = useState(false);
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
              hello {order.id}
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
