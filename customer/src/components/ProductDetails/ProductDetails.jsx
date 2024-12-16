import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";
import axios from "axios";
import { Height } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ProductDetails = ({ selectedProduct, state, setState, cartList }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handelAdd = (selectedProduct, quantity) => {
    // dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
    let user = JSON.parse(localStorage.getItem("user"));
    let addTocart = {
      quantity: 1,
      productId: selectedProduct?._id,
      customer_id: user?._id,
    };
  };
  // let checkProductInCart = cartList?.filter((item) => item.?.product_id?._id===selectedProduct?._id);
  // console.log(checkProductInCart)

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <img
              className="img_card "
             
              loading="lazy"
              src={`http://localhost:4000/uploads/product/${selectedProduct?.picture}`}
              alt=""
            />
          </Col>
          <Col md={6}>
            <h2>{selectedProduct?.title}</h2>
            {/* <div className="rate">
              <div className="stars">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <span>{selectedProduct?.avgRating} ratings</span>
            </div> */}
            <div className="info">
              <span className="price">
                Price:&nbsp;&nbsp;&nbsp;₹ {selectedProduct?.price}
              </span>
            </div>
            <div className="info">
              <span>
                category :&nbsp;&nbsp;&nbsp;{" "}
                {selectedProduct?.category_id?.title}
              </span>
            </div>
            <div className="info">
              <p>
                Discription:&nbsp;&nbsp;&nbsp;{selectedProduct?.description}
              </p>
            </div>
            {/* <input
              className="qty-input"
              type="number"
              placeholder="Qty"
              value={quantity}
              onChange={handleQuantityChange}
            /> */}
            <Link to="/book">
              <button aria-label="Add" type="submit" className="add">
                Book Now
              </button>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
