import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function OrderDetails({ user }) {
  let { id } = useParams();
  const [order, setOrder] = useState([]);
  const [shipping, setShipping] = useState(null);
  const [payment, setPayment] = useState(null);
  const [expanded, setExpanded] = React.useState("panel1");
  const [State, setState] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getOrder")
      .then((response) => {
        console.log(response.data);
        let filteredOrder = response.data?.order.filter(
          (items) => items._id == id
        );
        let filteredShipping = response.data?.shipping.filter(
          (items) => items.Order_id?._id == filteredOrder[0]._id
        );
        let filteredPayment = response.data?.payment.filter(
          (items) => items.Order_id?._id == filteredOrder[0]._id
        );
        setPayment(...filteredPayment);
        setShipping(...filteredShipping);
        setOrder(...filteredOrder);
        // setOrder(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [State]);

  const updateOrder = (data) => {
    console.log(data);
    axios
      .put(`http://localhost:4000/admin/updateOrder/${data?._id}`)
      .then((response) => {
        console.log(response.data);
        setState(!State);
        alert(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateCashOrder = (data) => {
    // console.log(data);
    let token = JSON.parse(localStorage.getItem("Token"));
    let orderI = {
      orderId: data?.Order_id?._id,
    };
    // console.log(orderI);
    axios
      .put(`http://localhost:4000/admin/updateCashOrder/${data?._id}`, orderI)
      .then((response) => {
        console.log(response.data);
        setState(!State);
        alert(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const update = (data) => {
    // console.log(data);
    axios
      .put(`http://localhost:4000/admin/updatePayment/${data?._id}`)
      .then((response) => {
        console.log(response.data);
        setState(!State);
        alert(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box sx={{ width: "95%", padding: 5 }}>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" colSpan={7}>
                Ordered Service
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell colSpan={2}>Service</StyledTableCell>
              <StyledTableCell>Service_Items</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Quantity</StyledTableCell>
              <StyledTableCell align="center">Total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order?.OrderDetails?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell sx={{ width: "100px" }}>
                  <img
                    src={`http://localhost:4000/uploads/product/${row?.productId?.picture}`}
                    alt=""
                    style={{ width: "100px", height: "100px" }}
                  />
                </StyledTableCell>
                <StyledTableCell sx={{ width: "100px" }}>
                  {row?.productId?.title}
                </StyledTableCell>
                <StyledTableCell sx={{ width: "100px" }}>
                  {row?.service_product}
                </StyledTableCell>

                <StyledTableCell align="center">
                  ₹{row?.productId?.price}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row?.quantity}
                </StyledTableCell>
                <StyledTableCell align="center">₹{row?.total}</StyledTableCell>
              </TableRow>
            ))}
            <TableRow>
              <StyledTableCell colSpan={5} align="right">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    {order?.status == "Pending" ||
                    order?.status == "pending" ? (
                      <>
                        <Button
                          variant="outlined"
                          onClick={() => updateOrder(order)}
                          color="success"
                        >
                          Deliver Order
                        </Button>
                      </>
                    ) : (
                      <b style={{ color: "green" }}>{order?.status}</b>
                    )}
                  </Box>
                  <Box>
                    <b>Grand Total : ₹{order?.GrandTotal}</b>
                  </Box>
                </Box>
              </StyledTableCell>
            </TableRow>
          </TableBody>{" "}
        </Table>
      </TableContainer>
      <div>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Shipping Info</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Location</StyledTableCell>
                    <StyledTableCell align="center">Address</StyledTableCell>
                    <StyledTableCell align="center">State</StyledTableCell>
                    <StyledTableCell align="center">Pincode</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell>{shipping?.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {shipping?.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {shipping?.location}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {shipping?.address}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {shipping?.state}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {shipping?.pinCode}
                    </StyledTableCell>
                  </TableRow>
                </TableBody>{" "}
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Customer Info</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell colSpan={2}>Name</StyledTableCell>
                    <StyledTableCell align="center">Phone</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell>
                      <img
                        src={`http://localhost:4000/Uploads/customer/${order?.User_id?.profile}`}
                        alt=""
                        style={{ width: "100px", height: "100px" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>{order?.User_id?.name}</StyledTableCell>

                    <StyledTableCell align="center">
                      {order?.User_id?.phone}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order?.User_id?.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {order?.User_id?.address}
                    </StyledTableCell>
                  </TableRow>
                </TableBody>{" "}
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Payment Info</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Payment method</StyledTableCell>
                    <StyledTableCell align="center">
                      Transaction ID
                    </StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell>{payment?.payment_method}</StyledTableCell>

                    <StyledTableCell align="center">
                      {payment?.payment_method == "upi" ? (
                        payment?.transaction_id
                      ) : (
                        <>-</>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {payment?.status}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {(payment?.payment_method == "upi" &&
                        payment?.status == "Pending") ||
                      payment?.status == "pending" ? (
                        <>
                          <Button
                            variant="outlined"
                            onClick={() => update(payment)}
                          >
                            Verify
                          </Button>
                        </>
                      ) : (payment?.payment_method == "cash" &&
                          payment?.status == "Pending") ||
                        payment?.status == "pending" ? (
                        <>
                          <Button
                            variant="outlined"
                            onClick={() => updateCashOrder(payment)}
                          >
                            Amount Received ?
                          </Button>
                        </>
                      ) : (
                        <>{payment?.status}</>
                      )}
                    </StyledTableCell>
                  </TableRow>
                </TableBody>{" "}
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
        <Box>
          <Link to={"/dashboard"}>
            <Button variant="contained" sx={{ m: 1 }}>
              Go back
            </Button>
          </Link>
        </Box>
      </div>
    </Box>
  );
}
