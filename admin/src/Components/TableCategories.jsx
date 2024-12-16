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
  const [categoryInfo, setcategoryInfo] = useState(null);
  const [categoryFile, setcategoryFile] = useState(null);
  const [categories, setcategories] = useState(null);
  const [state, setState] = useState(true);
  const [selectedCategory, setselectedCategory] = useState(null);
  //togetcategories
  React.useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getAllCategories")
      .then((response) => {
        setcategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state]);

  //to open insert category modal
  const handleInsertModalOpen = () => {
    setInsertModal(true);
  };
  //to open update category modal
  const handleUpdateModalOpen = (category) => {
    setselectedCategory(category);
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
  const handleCategoryInfo = (event) => {
    setcategoryInfo(event.target.value);
  };

  //to track category picture
  const handleCategoryFile = (event) => {
    setcategoryFile(event.target.files[0]);
  };

  //to insert category info into database
  const handleCategoryInsert = () => {
    console.log(categoryFile);
    console.log(categoryInfo);
    const formData = new FormData();
    formData.append("title", categoryInfo);
    formData.append("picture", categoryFile);
    axios
      .post("http://localhost:4000/admin/insertCategory", formData)
      .then((response) => {
        console.log(response.data);
        setState(!state);
        if (response.data.success == true) {
          setInsertModal(false);
          setcategoryFile(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //to track updatedcategory info
  const handleUpdatedCategoryInfo = (event) => {
    setselectedCategory({
      ...selectedCategory,
      [event.target.name]: event.target.value,
    });
  };

  //to track updatedcategory picture
  const handleUpdatedCategoryFile = (event) => {
    setcategoryFile(event.target.files[0]);
  };

  const handleCategoryUpdate = () => {
    console.log(selectedCategory);
    console.log(categoryFile);
    const formData = new FormData();
    formData.append("title", selectedCategory.title);
    formData.append("status", selectedCategory.status);
    formData.append("picture", categoryFile);
    axios
      .put(
        `http://localhost:4000/admin/updateCategory/${selectedCategory._id}`,
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
      <Dialog open={insertModal} onClose={handleInsertModalClose}>
        <DialogTitle>Insert New Category</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <DialogContentText>Fill the category info</DialogContentText>
          <TextField
            onChange={handleCategoryInfo}
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
            onChange={handleCategoryFile}
            autoFocus
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
          <Button onClick={handleCategoryInsert}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={updateModal} onClose={handleUpdateModalClose}>
        <DialogTitle>Update Category</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <DialogContentText>Update the category info</DialogContentText>
          <TextField
            onChange={handleUpdatedCategoryInfo}
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            value={selectedCategory?.title}
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={handleUpdatedCategoryFile}
            autoFocus
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
              {selectedCategory?.status}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedCategory?.status}
              label="Status"
              onChange={handleUpdatedCategoryInfo}
              variant="standard"
              sx={{ mt: 5 }}
              name="status"
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateModalClose}>Cancel</Button>
          <Button onClick={handleCategoryUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={5} align="center">
                Categories
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <StyledTableCell>Sl No</StyledTableCell>
              <StyledTableCell align="right">Category image</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th">{index + 1}</StyledTableCell>
                <StyledTableCell align="right">
                  <img
                    style={{
                      width: "100px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                    src={`http://localhost:4000/uploads/category/${row?.picture}`}
                    alt="picture"
                  />
                </StyledTableCell>
                <StyledTableCell align="right">{row?.title}</StyledTableCell>
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
