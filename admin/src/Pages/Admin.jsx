import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: "" }); // Clear errors when user starts typing
  };

  const validate = () => {
    let tempErrors = { email: "", password: "" };
    let isValid = true;

    if (!userInfo.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    }

    if (!userInfo.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };
  // const Swal = require("sweetalert2");
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const Toast1 = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleSubmit = (event) => {
    if (!validate()) {
      return;
    }

    axios
      .post("http://localhost:4000/admin/login", userInfo)
      .then(async (res) => {
        if (res.data.success === true) {
          localStorage.setItem("Admin", JSON.stringify(res.data.loggedInUser));
          localStorage.setItem("Token", JSON.stringify(res.data.authToken));
          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
          });
          setTimeout(() => {
            navigate("/dashboard");
          }, 3000);
        } else {
          Toast.fire({
            icon: "error",
            title: "Invalid Email or Password",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Font = {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "700 !important",
    fontSize: "20px",
    lineHeight: "21px",
    color: "rgba(0, 0, 0, 0.7)",
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
      <Grid item xs={false} sm={4} md={7} sx={{}} />
      <Grid
        item
        sx={{
          overflow: "hidden",
          height: "70%",
          width: "80%",
          background: "#FFFFFF",
          boxShadow: " 5px 5px 250px #657E96",
          borderRadius: " 50px",
          marginTop: "120px",
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
          <Typography component="h1" sx={Font} variant="h5">
            Sign in as Admin
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              sx={Font}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <TextField
              sx={Font}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={Boolean(errors.password)}
              helperText={errors.password}
            />

            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                boxShadow: " 5px 5px 250px #657E96",
                borderRadius: " 10px",
                height: "50px",
              }}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
              {/* <Grid item>
                  <Link to={'/register'} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
            </Grid>
            {/* <Copyright sx={{ mt: 5 }} /> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
