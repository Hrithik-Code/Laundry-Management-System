import { Carousel } from "react-bootstrap";
import p1 from "../../Images/2306.i518.020.S.m005.c13.realistic washing machine.jpg";
import p2 from "../../Images/Basket of clean towels on a wooden table -1.jpg";
import p3 from "../../Images/services.jpg";
import p4 from "../../Images/Pricing_new.jpg";
import p5 from "../../Images/home-page-try (1).jpg";
import p6 from "../../Images/About_us.jpg";
import "./banner.css";

export const SliderData = [
  {
    id: 2,
    title: "A best  Laundry Service",
    desc: "Welcome to our Service, where every Clothes are handled with great Care.",
    cover: p5,
  },
  {
    id: 3,
    title: "From our Laundry Service to your Doorstep",
    desc: "At Laundry Service, we believe that good service is the foundation of happiness. Welcome to a place where happiness is served on every service.",
    cover: p6,
  },
  {
    id: 4,
    title: "Bringing you the best service",
    desc: "If you don't go the gym, you don't look good. If you don't tan, you're pale. If you don't do laundry, you don't got no clothes..",
    cover: p3,
  },
  {
    id: 5,
    title: "Fined with love, just for you",
    desc: "Step inside and leave the ordinary behind. Welcome to a world of extraordinary and exceptional Looks",
    cover: p4,
  },
];

const Banner = () => {
  return (
    <Carousel slide={false}>
      {SliderData.map((item) => (
        <Carousel.Item key={item.id}>
          <img
            className="d-block w-100 h-100"
            src={item.cover}
            alt={item.title}
          />
          <Carousel.Caption>
            <h3 className="item-title">{item.title}</h3>
            <p>{item.desc}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Banner;
