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
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/admin/getAllProducts")
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state]);
  // // waste
  // export default function CustomizedTables() {
  //   const [insertModal, setInsertModal] = useState(false);
  //   const [updateModal, setUpdateModal] = useState(false);
  //   const [categoryInfo, setcategoryInfo] = useState(null);
  //   const [categoryFile, setcategoryFile] = useState(null);
  //   const [categories, setcategories] = useState(null);
  //   const [state, setState] = useState(true);
  //   const [selectedCategory, setselectedCategory] = useState(null);

  //to open insert category modal
  const handleInsertModalOpen = () => {
    setInsertModal(true);
  };
  //to open update category modal
  const handleUpdateModalOpen = (product) => {
    setselectedproduct(product);
    setUpdateModal(true);
  };
  //to close insert category modal
  const handleInsertModalClose = () => {
    setInsertModal(false);
  };
  //to close update category modal
  const handleUpdateModalClose = () => {
    setUpdateModal(false);
  };
  //to track category info
  const handleproductInfo = (event) => {
    setproductInfo({ ...productInfo, [event.target.name]: event.target.value });
  };
  const handleChange = (event) => {
    setselectedCategory(event.target.value);
  };
  //to track category picture
  const handleproductFile = (event) => {
    setproductFile(event.target.files[0]);
  };

  const handleproductInsert = () => {
    console.log(productInfo);
    console.log(selectedCategory);
    console.log(productFile);
    //   console.log(selectedCategory)
    const formData = new FormData();
    formData.append("title", productInfo.title);
    formData.append("description", productInfo.description);
    formData.append("category_id", selectedCategory);
    formData.append("quantity", productInfo.quanity);
    formData.append("price", productInfo.price);
    formData.append("picture", productFile);
    axios
      .post(`http://localhost:4000/admin/insertProduct`, formData)
      .then((response) => {
        console.log(response.data);
        setState(!state);
        if (response.data.success == true) {
          setInsertModal(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleproductUpdatedInfo = (event) => {
    setselectedproduct({
      ...selectedproduct,
      [event.target.name]: event.target.value,
    });
  };
  console.log(selectedproduct);
  const handleUpdatedChange = (event) => {
    setselectedCategory(event.target.value);
  };
  //to track category picture
  const handleproductUpdatedFile = (event) => {
    setselectedproductFile(event.target.files[0]);
  };
  const handleproductUpdate = () => {
    //   console.log(selectedCategory)
    console.log(selectedproduct);
    console.log(selectedproductFile);
    console.log(selectedCategory);
    const formData = new FormData();
    formData.append("title", selectedproduct.title);
    formData.append("status", selectedproduct.status);
    formData.append("description", selectedproduct.description);
    formData.append("category_id", selectedCategory);
    // formData.append("quantity", selectedproduct.quantity);
    formData.append("price", selectedproduct.price);
    formData.append("picture", selectedproductFile);
    axios
      .put(
        `http://localhost:4000/admin/updateproduct/${selectedproduct._id}`,
        formData
      )
      .then((response) => {
        console.log(response.data);
        setState(!state);
        if (response.data.success == true) {
          setUpdateModal(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Button
        onClick={handleInsertModalOpen}
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ mb: 1 }}
      >
        Insert new
      </Button>
      {/* insertModal */}
      <Dialog open={insertModal} onClose={handleInsertModalClose}>
        <DialogTitle>Insert New Service</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <DialogContentText>Fill the Service info</DialogContentText>
          <TextField
            onChange={handleproductInfo}
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={handleproductInfo}
            required
            margin="dense"
            id="name"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            multiline
            sx={{ mb: 3 }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategory}
              label="Category"
              onChange={handleChange}
              variant="standard"
              sx={{ mt: 5 }}
            >
              {Categories?.map((item, index) => (
                <MenuItem key={index} value={item?._id}>
                  {item?.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <TextField
            onChange={handleproductInfo}
            required
            margin="dense"
            id="name"
            name="quanity"
            label="Quanity"
            type="text"
            fullWidth
            variant="standard"
            multiline
          /> */}
          <TextField
            onChange={handleproductInfo}
            required
            margin="dense"
            id="name"
            name="price"
            label="Price"
            type="number"
            fullWidth
            variant="standard"
            multiline
          />
          <TextField
            onChange={handleproductFile}
            required
            margin="dense"
            id="name"
            name="picture"
            label="Picture"
            type="file"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInsertModalClose}>Cancel</Button>
          <Button onClick={handleproductInsert}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* updateModal */}
      <Dialog open={updateModal} onClose={handleUpdateModalClose}>
        <DialogTitle>Update Service</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <DialogContentText>Update the Service info</DialogContentText>
          <TextField
            onChange={handleproductUpdatedInfo}
            value={selectedproduct?.title}
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={handleproductUpdatedInfo}
            value={selectedproduct?.description}
            required
            margin="dense"
            id="name"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            multiline
            sx={{ mb: 3 }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {selectedproduct?.category_id?.title}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategory}
              label="Category"
              onChange={handleUpdatedChange}
              variant="standard"
              sx={{ mt: 5 }}
            >
              {Categories?.map((item, index) => (
                <MenuItem key={index} value={item?._id}>
                  {item?.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <TextField
            onChange={handleproductUpdatedInfo}
            value={selectedproduct?.quantity}
            required
            margin="dense"
            id="name"
            name="quantity"
            label="Quanity"
            type="text"
            fullWidth
            variant="standard"
            multiline
          /> */}
          <TextField
            onChange={handleproductUpdatedInfo}
            value={selectedproduct?.price}
            required
            margin="dense"
            id="name"
            name="price"
            label="Price"
            type="text"
            fullWidth
            variant="standard"
            multiline
          />
          <TextField
            onChange={handleproductUpdatedFile}
            required
            margin="dense"
            id="name"
            name="picture"
            label="Picture"
            type="file"
            fullWidth
            variant="standard"
            sx={{ mb: 3 }}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {selectedproduct?.status}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedproduct?.status}
              label="Status"
              name="status"
              onChange={handleproductUpdatedInfo}
              variant="standard"
              sx={{ mt: 5 }}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateModalClose}>Cancel</Button>
          <Button onClick={handleproductUpdate}>Submit</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={8} align="center">
                Services
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              {/* <StyledTableCell>Sl No</StyledTableCell> */}
              <StyledTableCell colSpan={2} align="right">
                Service
              </StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Discription</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product?.map((row, index) => (
              <StyledTableRow key={index}>
                {/* <StyledTableCell component="th">{index + 1}</StyledTableCell> */}
                <StyledTableCell align="right">
                  <img
                    style={{
                      width: "100px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    src={`http://localhost:4000/uploads/product/${row?.picture}`}
                    alt="picture"
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <p style={{ width: "100px" }}>{row?.title}</p>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row?.category_id?.title}
                </StyledTableCell>
                <StyledTableCell align="right">{row?.price}</StyledTableCell>
                <StyledTableCell align="right">
                  <TextField
                    value={row?.description}
                    multiline
                    readOnly
                    rows="2"
                  />
                </StyledTableCell>
                <StyledTableCell align="right">{row?.status}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    onClick={() => handleUpdateModalOpen(row)}
                    variant="outlined"
                    color="primary"
                  >
                    Update
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
