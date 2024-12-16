import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Paper,
  Box,
  TextField,
  Card,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../app/features/cart/cartSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const service_product = ["Shirt", "T-Shirt", "Saree", "Kurtha", "Pants"];

const Book = () => {
  const navigate = useNavigate();
  const [selectPay, setSelectPay] = useState("");
  const [details, setDetails] = useState({});
  const [cartData, setCartData] = useState([]);
  const [Token, setToken] = useState("");
  const [formFields, setFormFields] = useState([
    { categoryId: "", productId: "", service_product: "", quantity: 1 },
  ]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("Token")) {
      navigate("/login");
    } else {
      const token = JSON.parse(localStorage.getItem("Token"));
      setToken(token);

      axios
        .get("http://localhost:4000/admin/getAllProducts")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get("http://localhost:4000/admin/getAllCategories")
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [navigate]);

  const HandleChange = (e) => {
    if (e?.target?.value === "upi" || e?.target?.value === "cash") {
      setSelectPay(e?.target?.value);
    }
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const HandleDetails = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleAddFields = () => {
    setFormFields([
      ...formFields,
      { categoryId: "", productId: "", service_product: "", quantity: 1 },
    ]);
  };

  const handleRemoveFields = (index) => {
    const fields = [...formFields];
    fields.splice(index, 1);
    setFormFields(fields);
  };

  const handleChange = (index, event) => {
    const fields = [...formFields];
    fields[index][event.target.name] = event.target.value;
    setFormFields(fields);
    // console.log(event.target.value, "12345");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalPrice = formFields.reduce((price, field) => {
      const product = products.find((p) => p._id === field.productId);
      return product ? price + field.quantity * product.price : price;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [formFields, products]);
  // console.log(details);
  const HandleOrder = () => {
    if (details?.name == null || details?.name == "") {
      alert("Please Enter Your Name");
    } else if (details?.email == null || details?.email == "") {
      alert("Please Enter Your Email");
    } else if (details?.phone == null || details?.phone == "") {
      alert("Please Enter Your Phone Number");
    } else if (details?.pincode == null || details?.pincode == "") {
      //pincode must contain 6 digits
      alert("Please Enter Your Pincode");
    } else if (!/^\d{6}$/.test(details.pincode)) {
      alert("Pincode must contain exactly 6 digits");
    } else if (details?.address == null || details?.address == "") {
      alert("Please Enter Your Address");
    } else {
      if (formFields[0]?.categoryId == "") {
        alert("Please Select Category");
      } else if (formFields[0]?.productId == "") {
        alert("Please Select Product");
      } else if (formFields[0]?.quantity == "") {
        alert("Please Enter Quantity");
      } else if (formFields[0]?.service_product == "") {
        alert("Please Select Service Product");
      } else {
        if (details?.paymethod == null) {
          alert("Please Select Your Payment Method");
        } else if (
          details?.trans_id === "" ||
          (details?.trans_id == null && details?.paymethod !== "cash")
        ) {
          alert("Please fill the transaction id!");
          return;
        } else {
          const orderData = {
            ...details,
            products: formFields.map((field) => ({
              productId: field.productId,
              quantity: field.quantity,
              service_product: field.service_product,
              total:
                products.find((p) => p._id === field.productId)?.price *
                field.quantity,
            })),
            totalPrice,
          };

          axios
            .post("http://localhost:4000/customer/insertorder", orderData, {
              headers: { "auth-token": Token },
            })
            .then((res) => {
              if (res.data.success === true) {
                toast.success(res.data.message);
                navigate("/thankyou");
              } else {
                toast.error(res.data.message);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  };

  return (
    <section className="cart-items">
      <Box sx={{ width: "100%", padding: 5 }}>
        <Card style={{ padding: "20px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h5 style={{ fontFamily: "fantasy" }}>Book Service</h5>
          </Box>
          <Grid
            sx={{
              padding: 5,
              display: "flex",
              justifyContent: "center",
            }}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                onChange={HandleDetails}
                name="name"
                label="Name"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "100%" }}
                type="email"
                name="email"
                onChange={HandleDetails}
                variant="outlined"
                label="Email"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "100%" }}
                type="number"
                name="phone"
                onChange={HandleDetails}
                variant="outlined"
                label="Phone number"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                name="location"
                onChange={HandleDetails}
                label="Location"
                required
                readOnly
                value={"Mangalore"}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                name="state"
                onChange={HandleDetails}
                label="State"
                required
                readOnly
                value={"Karnataka"}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "100%" }}
                type="number"
                name="pincode"
                onChange={HandleDetails}
                variant="outlined"
                label="Pincode"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ width: "100%" }}
                variant="outlined"
                name="address"
                onChange={HandleDetails}
                label="Complete Address"
                required
                multiline
                rows={2}
              />
            </Grid>
          </Grid>
          <h4 style={{ textAlign: "center", fontFamily: "fantasy" }}>
            Select Service
          </h4>
          <hr />
          <form onSubmit={handleSubmit} className="dynamic-form">
            {formFields.map((field, index) => {
              const category = categories.find(
                (cat) => cat._id === field.categoryId
              );
              // const isServiceItemDisabled =
              //   (category && category.title === "ironing and pressing") ||
              //   category.title === "";

              return (
                <Grid container spacing={2} key={index} className="form-group">
                  <Grid sx={{ marginBottom: "10px" }} item xs={2}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        name="categoryId"
                        value={field.categoryId}
                        onChange={(event) => handleChange(index, event)}
                        required
                        fullWidth
                        label="Category"
                      >
                        <MenuItem value="">
                          <em>Select a category</em>
                        </MenuItem>
                        {categories.map((category) => (
                          <MenuItem key={category._id} value={category._id}>
                            {category.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={2}>
                    <FormControl fullWidth>
                      <InputLabel>Services</InputLabel>
                      <Select
                        name="productId"
                        value={field.productId}
                        onChange={(event) => handleChange(index, event)}
                        required
                        fullWidth
                        label="Product"
                      >
                        <MenuItem value="">
                          <em>Select a Service</em>
                        </MenuItem>
                        {products
                          .filter(
                            (product) =>
                              product.category_id._id === field.categoryId
                          )
                          .map((product) => (
                            <MenuItem key={product._id} value={product._id}>
                              {product.title}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl fullWidth>
                      <InputLabel>Services Items</InputLabel>
                      <Select
                        name="service_product"
                        value={field.service_product}
                        onChange={(event) => handleChange(index, event)}
                        required
                        fullWidth
                        label="service_product"
                      >
                        <MenuItem value="">
                          <em>Select a Service_Item</em>
                        </MenuItem>
                        {service_product.map((item) => (
                          <MenuItem value={item} label={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={2}>
                    <TextField
                      name="quantity"
                      type="number"
                      value={field.quantity}
                      onChange={(event) => handleChange(index, event)}
                      fullWidth
                      required
                      label="Quantity"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      name="total"
                      value={
                        field.productId
                          ? products.find((p) => p._id === field.productId)
                              .price * field.quantity
                          : 0
                      }
                      onChange={HandleDetails}
                      label="Total"
                      InputProps={{
                        readOnly: true,
                        style: { fontWeight: "bold" },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-input": {
                          fontWeight: "bold",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="outlined"
                      onClick={() => handleRemoveFields(index)}
                      disabled={formFields.length === 1}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              );
            })}

            <Button
              variant="outlined"
              onClick={handleAddFields}
              style={{ marginTop: "20px" }}
            >
              Add More Products
            </Button>
          </form>
          <h6 style={{ fontFamily: "fantasy", marginLeft: "900px" }}>
            Total Payable Amount : ₹{totalPrice}
          </h6>
          <hr />
          <h4 style={{ textAlign: "center", fontFamily: "fantasy" }}>
            Payment
          </h4>
          <hr />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="upi"
                  name="paymethod"
                  onChange={HandleChange}
                  control={<Radio />}
                  label="Upi"
                />
                {selectPay === "upi" && (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: 5,
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <img
                        src="https://img.freepik.com/premium-vector/qr-code_578229-236.jpg?size=626&ext=jpg&ga=GA1.1.91097837.1700988374&semt=ais"
                        alt=""
                      />
                      <TextField
                        sx={{ mt: 2 }}
                        name="trans_id"
                        onChange={HandleChange}
                        variant="outlined"
                        label="Transaction Id"
                      />
                    </Box>
                  </Grid>
                )}
                <Box>
                  <Box>
                    <FormControlLabel
                      value="cash"
                      name="paymethod"
                      control={<Radio />}
                      onChange={HandleChange}
                      label="Cash"
                    />
                    {selectPay === "cash" && (
                      <small
                        style={{
                          fontWeight: "bolder",
                          fontSize: "10px",
                          color: "green",
                        }}
                      >
                        Pay After Receive Item
                      </small>
                    )}
                  </Box>
                </Box>
              </RadioGroup>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            onClick={HandleOrder}
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        </Card>
      </Box>
    </section>
  );
};

export default Book;
