import { Row } from "react-bootstrap";
import { memo, useEffect } from "react";
import ProductCard from "./ProductCard/ProductCard";
import LogoSlider from "./Logo_Slidder/logo-slidder";

const ShopList = ({ productItems, product }) => {
  // useEffect(() => {}, [productItems]);
  if (productItems.length === 0) {
    return <h1 className="not-found">Service Not Found !!</h1>;
  }
  return (
    <div>
      {/* <LogoSlider/> */}
      <Row className="justify-content-center">
        {productItems.map((productItem) => {
          return (
            <ProductCard
              key={productItem._id}
              title={null}
              productItem={productItem}
            />
          );
        })}
      </Row>
    </div>
  );
};
export default memo(ShopList);
