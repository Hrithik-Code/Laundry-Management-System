import React from "react";
import "./style.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../Images/logo.jpg";

const Footer = ({ loggedIn }) => {
  return (
    <footer>
      <Container>
        <Row className="footer-row">
          <Col md={3} sm={5} className="box">
            <div className="logo">
              {/* <ion-icon name="bag"></ion-icon>
              <h1>Laundry Service</h1> */}
              <Image className="logo" src={logo} />
            </div>
            <p>"Explore, Our Service: Your Ultimate Laundry Companion!"</p>
          </Col>
          <Col md={3} sm={5} className="box">
            <h2>Quick links</h2>
            <ul>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/shop">
                <li>shop</li>
              </Link>
              {loggedIn ? (
                <>
                  <Link to="/book">
                    <li>Booking</li>
                  </Link>{" "}
                </>
              ) : (
                <>
                  <Link to="/login">
                    <li>Login</li>
                  </Link>
                  <Link to="/Register">
                    <li>Register</li>
                  </Link>
                </>
              )}
            </ul>
          </Col>
          <Col md={3} sm={5} className="box">
            {/* <h2>Customer Care</h2>
            <ul>
              <li>Help Center </li>
              <li>How to Buy </li>
              <li>Track Your Order </li>
              <li>Corporate & Bulk Purchasing </li>
              <li>Returns & Refunds </li>
            </ul> */}
          </Col>
          <Col md={3} sm={5} className="box">
            <h2>Contact Us</h2>
            <ul>
              {/* <li>
                70 Washington Square South, New York, NY 10012, United States{" "}
              </li> */}
              <li>Email: yourLaundryservice@gmail.com</li>
              {/* <li>Phone: +1 1123 456 780</li> */}
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
