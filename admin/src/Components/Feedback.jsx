import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
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

export default function CustomizedTables() {
  const [feedback, setFeedback] = useState(null);
  React.useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getAllFeedbacks")
      .then((res) => {
        setFeedback(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(feedback, "111");
  return (
    <div style={{ marginTop: "3%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={7} align="center">
                Feedbacks
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              {/* <StyledTableCell>Sl No</StyledTableCell> */}
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Customer</StyledTableCell>
              <StyledTableCell>Contact</StyledTableCell>
              {/* <StyledTableCell colSpan={1} >
                Email
              </StyledTableCell> */}
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Message</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedback?.map((row, index) => (
              <StyledTableRow key={index}>
                {/* <StyledTableCell component="th">{index + 1}</StyledTableCell> */}

                <StyledTableCell>
                  {moment(row?.createdAt).format("DD-MM-YYYY")}
                </StyledTableCell>
                <StyledTableCell>{row?.User_id?.name}</StyledTableCell>
                <StyledTableCell>
                  {row?.User_id?.phone}
                  <br />
                  {row?.User_id?.email}
                </StyledTableCell>
                <StyledTableCell>{row?.title}</StyledTableCell>
                <StyledTableCell>
                  {" "}
                  <TextField
                    value={row?.feedback}
                    multiline
                    readOnly
                    rows="1"
                  />
                </StyledTableCell>
                {/* <StyledTableCell >{row?.email}</StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
