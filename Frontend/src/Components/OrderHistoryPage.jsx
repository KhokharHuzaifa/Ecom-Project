import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import { useOrderDataQuery } from "../redux/Api/orderDataApi";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "../redux/Api/authApi";

export default function OrderHistoryPage() {
  const [openRows, setOpenRows] = useState({}); 
  const [orderdata, setOrderData] = useState([]);
  const { data, isLoading, error } = useOrderDataQuery();
  const {data:me} = useGetMeQuery()
  const loggedInUserId = me && me.user._id
  const userOrders = data && data?.data.filter((order) => order.userId === loggedInUserId);

  console.log("Order Detail Data.............", `Eamil: ${data && data?.data.email} and UserId: ${data && data?.data.userId}`);  

  useEffect(() => {
    if (data && data?.data) {
      setOrderData(
        data.data.map((v) => ({
          payment_Id: v.paymentDetails.paymentId,
          order_Date: new Date(v.createdAt).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          total_Amount: v.totalAmount,
          productDetails: v.productDetails.map((product) => ({
            product_name: product.name,
            product_quantity: product.quantity,
            product_price: product.price,
            product_amount: (product.price * product.quantity).toFixed(2),
          })),
        }))
      );
    }
  }, [data]);


  const toggleRow = (paymentId) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [paymentId]: !prevOpenRows[paymentId],
    }));
  };

  return (
    <>
      <div style={{ margin: "10px" }}>
        <div
          style={{
            margin: "15px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Link to={"/"}>
            <ArrowBackIosIcon />
          </Link>
          <h3 style={{ marginTop: "6px" }}>Order History</h3>
        </div>

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>ID</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Total Amount</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {orderdata.map((row) => (
                <React.Fragment key={row.payment_Id}>
                  <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => toggleRow(row.payment_Id)} // Toggle specific row
                      >
                        {openRows[row.payment_Id] ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.payment_Id}
                    </TableCell>
                    <TableCell align="right">{row.order_Date}</TableCell>
                    <TableCell align="right">{row.total_Amount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={openRows[row.payment_Id]} // Use row-specific open state
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ margin: 1 }}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            component="div"
                          >
                            Product Details
                          </Typography>
                          <Table size="small" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">
                                  Total price ($)
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {row.productDetails.map((v, index) => (
                                <TableRow key={index}>
                                  <TableCell component="th" scope="row">
                                    {v.product_name}
                                  </TableCell>
                                  <TableCell>{v.product_price}</TableCell>
                                  <TableCell align="right">
                                    {v.product_quantity}
                                  </TableCell>
                                  <TableCell align="right">
                                    {v.product_amount}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}