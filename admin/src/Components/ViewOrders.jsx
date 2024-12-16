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
import moment from "moment";

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

export default function BasicTable() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getOrder")
      .then((response) => {
        console.log(response.data);
        setOrders(response.data.order);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <Box sx={{ width: "100%", padding: 5 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={6} align="center">
                Orders
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="center">Customer Name</StyledTableCell>
              <StyledTableCell align="center">Customer Phone</StyledTableCell>
              <StyledTableCell align="center">Customer Email</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((row, index) => {
              const formattedDate = row?.createdAt
                ? moment(row.createdAt).format("YYYY-MM-DD")
                : "Invalid Date";
              return (
                <StyledTableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell>
                    {formattedDate}
                    {/* <Moment>{row?.createdAt}</Moment> */}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.User_id?.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.User_id?.phone}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.User_id?.email}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.status}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Link to={`/viewOrderDetails/${row?._id}`}>
                      <Button variant="outlined">View</Button>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
