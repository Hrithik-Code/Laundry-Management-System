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
  const [insertModal, setInsertModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [productInfo, setproductInfo] = useState(null);
  const [productFile, setproductFile] = useState(null);
  const [Categories, setCategories] = useState([]);
  const [state, setState] = useState(true);
  const [selectedCategory, setselectedCategory] = useState(null);
  const [product, setProduct] = useState([]);
  const [selectedproduct, setselectedproduct] = useState(null);
  const [selectedproductFile, setselectedproductFile] = useState(null);
  React.useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getAllCategories")
      .then((response) => {
        setCategories(response.data?.categorys);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/admin/getAllProducts")
      .then((response) => {
        console.log(response.data);
        setProduct(response.data?.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state]);
  return (
    <div>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={7} align="center">
                Latest products
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={2}>product</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>
                  <img
                    style={{
                      width: "100px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    src={`http://localhost:7007/uploads/product/${row?.picture}`}
                    alt="picture"
                  />
                </StyledTableCell>
                <StyledTableCell>{row.title}</StyledTableCell>
                <StyledTableCell>{row.price}</StyledTableCell>
                <StyledTableCell>{row.quantity}</StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
