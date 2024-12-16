import { Col } from "react-bootstrap";
import "./product-card.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { IconButton } from "@mui/material";

const ProductCard = ({ title, productItem, categories }) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const handelClick = () => {
    router(`/shop/${productItem?._id}`);
  };
  // const handelAdd = (productItem) => {
  //   dispatch(addToCart({ product: productItem, num: 1 }));
  //   toast.success("Product has been added to cart!");
  // };
  return (
    <div className="p-flex">
      <Col className="product mtop">
        <Link to={"/shopdetails/" + productItem?._id}>
          <img
            className="product-img "
            style={{
              width: "100%",
              height: "40vh",
              borderRadius: "10px",
              objectFit: "fill",
            }}
            loading="lazy"
            src={`http://localhost:4000/uploads/product/${productItem?.picture}`}
            alt=""
          />
        </Link>

        {/* <div className="product-like">
        <ion-icon name="heart-outline"></ion-icon>
      </div> */}
        <div className="product-details">
          <h3 className="title" onClick={() => handelClick()}>
            {productItem?.title}
          </h3>
          <div className=" ">
            <h6 className="price">₹{productItem?.price}</h6>
            {/* <IconButton>
                <RemoveRedEyeIcon />
              </IconButton> */}
          </div>
        </div>
      </Col>
    </div>
  );
};

export default ProductCard;
