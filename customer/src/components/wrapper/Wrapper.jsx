import React from "react";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import { serviceData } from "../../utils/products";
import { Link } from "react-router-dom";
import { Padding } from "@mui/icons-material";
import f1 from "../../Images/serv_icon_1.png";
const Wrapper = ({ categories }) => {
  console.log(categories, "121");
  return (
    <section className="wrapper background">
      <Container>
        <h1 className="font">Our Services</h1>

        <Row className="row">
          {categories.map((val, index) => {
            return (
              <Col
                md={4}
                sm={6}
                xs={9}
                // style={{ backgroundColor: "#f6f9fc" }}
                className="feature"
                key={index}
              >
                <div className="">
                  <img
                    style={{
                      width: "100%",
                      height: "40vh",
                      objectFit: "cover",
                      borderRadius: "10px", // Adjust the border radius as needed
                      // boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Add a box shadow for the blur effect
                    }}
                    src={`http://localhost:4000/uploads/category/${val.picture}`}
                    // alt="category"
                  />
                </div>
                <div className="text-center mt-4 bg-white">
                  {/* <div className="text-green-500 text-2xl font-semibold">
                      LAUNDRY BY KG
                    </div> */}
                  <img className="img1" src={f1} />

                  <h1 className="title">{val.title}</h1>
                  <Link className="link" to={"/shop/" + val?._id}>
                    Learn More
                  </Link>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Wrapper;
