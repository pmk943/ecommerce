import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import getProductData from "../../services/getProductsData";

function Home() {
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    (async function () {
      const data = await getProductData();
      setProductsData(data);
    })();
  }, [getProductData]);
  console.log(productsData);

  const renderTile = (current_item) => {
    return <ProductCard product={current_item}></ProductCard>;
  };
  let tiles = [];
  for (let i = 0; i < productsData.length; i++) {
    const current_item = productsData[i];
    tiles.push(renderTile(current_item));
    debugger;
  }
  return (
    <div className="home-container" >
      <div id="wrapper">
        <div id="product-catalog">{tiles}</div>
      </div>
    </div>
  );
}

export default Home;
