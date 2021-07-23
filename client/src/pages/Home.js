import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-primary h1 font-weight-bold text-center">
        <Jumbotron text={["Welcome to Laptop Mania","Get Laptops from Best Brands","At Best Prices"]} />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        <b>New Arrivals</b>
      </h4>
      <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        <b>Best Sellers</b>
      </h4>
      <BestSellers />
      <br />
      <br />
    </>
  );
};

export default Home;
