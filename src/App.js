import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./views/home/Home";
import { Routes, Route } from "react-router-dom";
import ProductMoreDetails from "./views/productfulldetails/ProductMoreDetails";

const App = () => {
  const [productsData, setProductsData] = useState([]);
  const [filterdProductsData, setfilterdProductsData] = useState([]);
  //todo in development useffect runs twice remove if(x===1 ) inside useEffect afterwards
  let x = 1;
  useEffect(() => {
    if (x === 1) {
      x++;
      function zill() {
        if (window.zilPay) {
          const createcollection = async () => {
            //connect to wallet
            await window.zilPay.wallet.connect()
            const contractName = process.env.REACT_APP_CONTRACT_ADDRESS;
            let contractDetails = window.zilPay.contracts.at(contractName);

            if (contractDetails) {
              try {
                let productDetailsArr = [];
                const marketPlaceData = await contractDetails.getState();
                const { id_to_market_item } = marketPlaceData;
                for (const key in id_to_market_item) {
                  const [
                    nftAddress,
                    tokenId,
                    ownerAddress,
                    _,
                    priceInBPS,
                    otherArguments = {},
                  ] = id_to_market_item[key]?.arguments;

                  if (tokenId !== "5") {
                    const cdetail = window.zilPay.contracts.at(nftAddress);
                    const secondDataFetch = await cdetail.getState();
                    const { token_uris = {}, token_name = "" } =
                      secondDataFetch;

                    let tokenImageDetails = JSON.parse(
                      token_uris[tokenId]?.replaceAll("'", '"')
                    );

                    productDetailsArr.push({
                      tokenId,
                      ownerAddress,
                      tokenImageDetails: tokenImageDetails,
                      tokenPrice: priceInBPS,
                      tokenName: token_name,
                      isItemSoldAlready: otherArguments?.constructor,
                    });
                  }
                }

                setProductsData(productDetailsArr);
                setfilterdProductsData(productDetailsArr);
              } catch (err) {
                console.log(
                  "error occured while fetching the data in App component",
                  err
                );
              }
            } else {
              contractDetails = undefined;
            }
          };

          createcollection();
        } else {
          alert("Cannot find Zilpay");
        }
      }

      zill();
    }
  }, [x]);
  const onSearch = (searchText) => {
    setfilterdProductsData(
      productsData.filter((productsObj) =>
        productsObj.tokenImageDetails.name.startsWith(searchText)
      )
    );
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home productsData={filterdProductsData} onSearch={onSearch} />
          }
        />
        <Route
          path="/about/:productId"
          element={<ProductMoreDetails productsData={filterdProductsData} />}
        />
      </Routes>
    </>
  );
};

export default App;
