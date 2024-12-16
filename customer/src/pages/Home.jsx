import { Fragment } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../components/Hero/Hero";
import Hero2 from "../components/Hero2/Hero";
import Banner from "../components/Banner/Banner";
const Home = () => {
  // const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    //   axios
    //     .get("http://localhost:4000/customer/viewAllProducts")
    //     .then((response) => {
    //       setProducts(response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    axios
      .get("http://localhost:4000/admin/getAllCategories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useWindowScrollToTop();
  return (
    <Fragment>
      {/* <SliderHome /> */}
      <Banner />
      <Hero />
      <Wrapper categories={categories} />
      <Hero2 />

      {/* <Section
        title="Big Discount"
        bgColor="#f6f9fc"
        productItems={discoutProducts}
      /> */}
      {/* <Section
        title="Indian"
        bgColor="white"
        productItems={newArrivalData}
      />
      <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} /> */}
    </Fragment>
  );
};

export default Home;
