import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import "./hero.css";
import { Box } from "@mui/material";
import { Height, WidthFull } from "@mui/icons-material";
import icon1 from "../../Images/icon_4.png";
import icon2 from "../../Images/icon_3.png";
import icon3 from "../../Images/icon_2.png";
import icon4 from "../../Images/icon_1.png";
export default function Hero() {
  return (
    <section className="hero">
      <Container className="container-fluid">
        <Box className="hero-container">
          <Typography component="h1" variant="h5">
            <span className="img-container">
              <Image className="imge1" src={icon1} alt="Icon 1" />
            </span>{" "}
            INDIA’S NO. 1 LAUNDRY & DRY-CLEANING <br></br>BRAND FROM AN IITIAN
            {/* <Image src={icon2} />
          <Image src={icon3} /> */}
            <span className="img-container">
              <Image className="imge2" src={icon1} alt="Icon 1" />
            </span>
            {/* <Image src={icon4} /> */}
          </Typography>
        </Box>
      </Container>
    </section>
  );
}
