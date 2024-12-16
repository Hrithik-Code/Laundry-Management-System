import { Col, Container, FormControl, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState } from "react";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Grid, InputLabel, MenuItem, Select } from "@mui/material";
import Hero2 from "../components/Hero2/Hero";

const Shop = () => {
  const { id: categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterList, setFilterList] = useState([]);
  // const [filter, setFilter] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getAllProducts")
      .then((response) => {
        console.log(response.data);
        let allProducts = response.data;
        // let filteredProducts = allProducts.filter((product) => product.isAvailable === true);
        setProducts(response.data);
        // setFilter(response.data);
        let filteredProducts = categoryId
          ? allProducts.filter((product) => {
              console.log(product);
              return product?.category_id?._id == categoryId;
            })
          : allProducts;
        // setProducts(filteredProducts);
        console.log(filteredProducts, "11111");
        setFilterList(filteredProducts);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/admin/getAllCategories")
      .then((response) => {
        setCategories(response.data);
        // let filteredProducts = allProducts.filter((product) => product.isAvailable === true);
        // setFilterList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(filterList, 654321);

  // console.log(categoryId, "1234");

  const handleChange = (index, event) => {};

  useWindowScrollToTop();
  console.log(filterList);
  const font = {
    fontSize: "30px",
    color: "#003a25",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: "2px",
    marginBottom: "22px",
    fontWeight: "600",
  };
  return (
    <Fragment>
      <Banner title="Services" />
      <section className="filter-bar">
        <h3 style={font}>Our Services</h3>
        <hr></hr>
        <Container className="filter-bar-container">
          <Row className="justify-content-center w-100">
            {/* <Col md={4}>
              <FilterSelect
                products={products}
                categories={categories}
                setFilterList={setFilterList}
              />
            </Col>
            {/* <Col className="w-100 bg-dark"> */}
            {/* <SearchBar products={products} setFilterList={setFilterList} />  */}
            {/* </Col> */}
          </Row>
        </Container>
        <Container>
          <ShopList productItems={filterList} />
        </Container>
        {/* <Hero2 /> */}
      </section>
    </Fragment>
  );
};

export default Shop;
