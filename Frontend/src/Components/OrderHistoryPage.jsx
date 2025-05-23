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
import { QueryClient } from "@tanstack/react-query";
import { BounceLoader } from "react-spinners";

export default function OrderHistoryPage() {
  const [openRows, setOpenRows] = useState({});
  const [orderdata, setOrderData] = useState([]);
  const { data: me } = useGetMeQuery();
  const [hasOrders, setHasOrders] = useState(false);

  const queryClient = new QueryClient();

  const { data, isLoading, error, refetch } = useOrderDataQuery(undefined, {
    refetchOnMount: true,
    refetchOnReconnect: true,
    cacheTime: 0,
  });

  useEffect(() => {
    queryClient.removeQueries("orderData");
    refetch();
  }, [me?.user?._id, queryClient, refetch]);

  useEffect(() => {
    if (data && data?.data && me?.user?._id) {
      const loggedInUserId = me.user._id;
      const userOrders = data.data.filter(
        (order) => order.userId === loggedInUserId
      );

      setOrderData(
        userOrders.map((v) => ({
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

      setHasOrders(userOrders.length > 0);
    }
  }, [data, me]);

  const toggleRow = (paymentId) => {
    setOpenRows((prevOpenRows) => ({
      ...prevOpenRows,
      [paymentId]: !prevOpenRows[paymentId],
    }));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading orders</div>;

  return (
    <>
      <div style={{ margin: "10px" }}>
        {isLoading ? (
          <BounceLoader color="#ffcf00" size={100} />
        ) : (
          <>
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

            {hasOrders ? (
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
                              onClick={() => toggleRow(row.payment_Id)}
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
                          <TableCell align="right">
                            {row.total_Amount}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            style={{ paddingBottom: 0, paddingTop: 0 }}
                            colSpan={6}
                          >
                            <Collapse
                              in={openRows[row.payment_Id]}
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
                                      <TableCell align="right">
                                        Quantity
                                      </TableCell>
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
            ) : (
              <div style={{ textAlign: "center" }}>
                <h1>You haven't placed any orders</h1>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
