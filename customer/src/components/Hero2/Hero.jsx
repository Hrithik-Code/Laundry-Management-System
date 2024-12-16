import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import "./hero2.css";
import { Box } from "@mui/material";
import { Height, WidthFull } from "@mui/icons-material";
import icon1 from "../../Images/icon_4.png";
import icon2 from "../../Images/icon_3.png";
import icon3 from "../../Images/icon_2.png";
import icon4 from "../../Images/icon_1.png";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <section className="hero2">
      {/* <Container className="container-fluid"> */}
      <Box className="hero2-container">
        <div className="content">
          <Typography component="h1" variant="h5">
            {/* <Image className="img1" src={icon1} /> */}
            Book Your Laundry<br></br>{" "}
          </Typography>

          <p className="pp">
            Now you can book your laundry online and avail free home delivery,
            pickup services based on your choice.
          </p>
          <Link to="/shop">
            <button className="btn">BOOK ONLINE</button>
          </Link>
        </div>
        {/* <Image src={icon2} />
          <Image src={icon3} /> */}
        {/* <Image className="img2" src={icon1} /> */}
        {/* <Image src={icon4} /> */}
      </Box>
      {/* </Container> */}
    </section>
  );
}
