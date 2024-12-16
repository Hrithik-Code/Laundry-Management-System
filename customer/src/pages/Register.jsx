import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide({ setNav }) {
  useEffect(() => {
    setNav(false);
  }, []);

  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [userProfile, setUserProfile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChangeUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleChangeUserProfile = (e) => {
    setUserProfile(e.target.files[0]);
    setErrors({ ...errors, profile: "" });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!userInfo.name) newErrors.name = "Name is required";
    if (!userInfo.phone) newErrors.phone = "Phone number is required";
    if (!userInfo.email) newErrors.email = "Email is required";
    if (!userInfo.password) newErrors.password = "Password is required";
    if (!userProfile) newErrors.profile = "Profile picture is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("name", userInfo.name);
    formData.append("phone", userInfo.phone);
    formData.append("email", userInfo.email);
    formData.append("password", userInfo.password);
    formData.append("profile", userProfile);

    axios
      .post(`http://localhost:4000/customer/Register`, formData)
      .then((response) => {
        console.log(response.data);
        if (response.data.success === true) {
          navigate("/login");
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        backgroundImage:
          "url(https://img.freepik.com/free-photo/dapper-suits-mannequins-showcase-fine-tailoring-elegance-mens-fashion-boutique_91128-4592.jpg?w=900&t=st=1719557306~exp=1719557906~hmac=19c9f468fb310694f84543119438af16cd730a56157e3c9baa60e55773021049)",
        backgroundRepeat: "no-repeat",
        backgroundColor: (t) =>
          t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Grid item xs={false} sm={4} md={7} />
      <Grid
        item
        sx={{
          overflow: "hidden",
          height: "100%",
          width: "100%",
          background: "#FFFFFF",
          boxShadow: "5px 5px 250px #657E96",
          borderRadius: "50px",
          // marginTop: "-10px",
          marginLeft: "-100px",
          position: "relative",
        }}
        xs={12}
        sm={8}
        md={5}
        className="card"
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              onChange={handleChangeUserInfo}
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              error={!!errors.name}
              // helperText={errors.name}
            />
            <TextField
              onChange={handleChangeUserInfo}
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Contact Number"
              name="phone"
              type="number"
              error={!!errors.phone}
              // helperText={errors.phone}
            />
            <TextField
              onChange={handleChangeUserInfo}
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={!!errors.email}
              // helperText={errors.email}
            />
            <TextField
              onChange={handleChangeUserInfo}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!errors.password}
              // helperText={errors.password}
            />
            <TextField
              onChange={handleChangeUserProfile}
              margin="normal"
              required
              fullWidth
              type="file"
              id="profile"
              label="Profile Picture"
              name="profile"
              InputLabelProps={{ shrink: true }}
              error={!!errors.profile}
              // helperText={errors.profile}
            />
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to={"/login"} variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
