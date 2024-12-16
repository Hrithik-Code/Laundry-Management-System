import { Col, Container, Row } from "react-bootstrap";
import "./slidercard.css";
import { Link } from "react-router-dom";

const SlideCard = ({ title, desc, cover }) => {
  return (
    <div className="slide-card-wrapper">
      <Container className="box">
        <Row>
          <Col md={6}>
            <div className="image-container">
              <img src={cover} alt="#" />
            </div>
          </Col>
          <Col md={6}>
            <h1>{title}</h1>
            <p>{desc}</p>
            <Link
              style={{ textDecoration: "none" }}
              to={"/shop"}
              className="btn-primary"
            >
              View Services
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SlideCard;
