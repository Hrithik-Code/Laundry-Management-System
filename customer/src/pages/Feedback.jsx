import React from "react";
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
import { Fragment, useState } from "react";
import Banner from "../components/Banner/Banner";
import { Padding } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import feed from "../Images/9019830.jpg";
export default function Feedback() {
  let Navigate = useNavigate();
  const [feedInfo, setFeedInfo] = useState(null);
  const handleChangeFeedInfo = (e) => {
    setFeedInfo({ ...feedInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("Token"));

    axios
      .post(`http://localhost:4000/customer/feedback`, feedInfo, {
        headers: { "auth-token": token },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success == true) {
          Navigate("/");
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
    <Fragment>
      <Banner title="Feedback" />
      <section className="filter-bar">
        {/* <h3 style={{ marginLeft: "100px" }}>Feedback</h3> */}
        <Box
          sx={{
            width: "75%",
            padding: 5,
            marginLeft: "15%",
            borderColor: "ThreeDHighlight",
          }}
        >
          <Card style={{ padding: "20px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <h5 style={{ fontFamily: "fantasy" }}>Feedback</h5>
            </Box>
            <img
              style={{
                height: "200px",
                marginLeft: "300px",
                // marginTop: "140px",
              }}
              className="img-feed"
              src={feed}
            />

            <Grid
              sx={{
                padding: 5,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column-reverse",
              }}
              container
              component="form"
              onSubmit={handleSubmit}
              rowSpacing={3}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Button
                variant="contained"
                type="submit"
                color="primary"
                style={{
                  marginTop: "20px",
                  width: "100px",
                  marginLeft: "330px",
                }}
              >
                Submit
              </Button>
              <Grid item xs={6}>
                <TextField
                  required
                  style={{ width: "100%", marginLeft: "150px" }}
                  name="message"
                  onChange={handleChangeFeedInfo}
                  variant="outlined"
                  label="Message"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  style={{ width: "100%", marginLeft: "150px" }}
                  variant="outlined"
                  onChange={handleChangeFeedInfo}
                  name="title"
                  label="Title"
                />
              </Grid>
            </Grid>
          </Card>
        </Box>
      </section>
    </Fragment>
  );
}
