import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

function Home(props) {
  const { productsData: productsToDisplay } = props;
  const displayProducts = productsToDisplay.map((productData) => <ProductCard props={productData}></ProductCard>);

  return (
    <div className="home-container">
      <div id="wrapper">
        <div id="product-catalog">{displayProducts}</div>
      </div>
    </div>
  );
}

export default Home;
