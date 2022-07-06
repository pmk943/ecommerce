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
          window.zilPay.wallet.connect().then(() => {
            const addr = window.zilPay.wallet.defaultAccount.bech32;

            //Query blockchain for balance
            window.zilPay.blockchain.getBalance(addr).then((resp) => {
              let myInitObject = resp.result["balance"];

              const createcollection = async () => {
                // var cName = "0x72af046df15baea42974395ae601b4e42b18b9a5"; //prompt("Please enter Collection Name");
                const cName = "0x60653dff3a02f5e966c4580c76a0266ba1965714";
                const cDetails = window.zilPay.contracts.at(cName);

                // const spName = "0x8cac23a93c933a81d03a5d86c5433af46db8af7d";
                // const spDetails = window.zilPay.contracts.at(spName);

                if (cDetails) {
                  try {
                    let productDetailsArr = [];
                    const firstData = await cDetails.getState();
                    console.log("firstDataModel", firstData);
                    const { id_to_market_item } = firstData;
                    for (const key in id_to_market_item) {
                      const [
                        nftAddress,
                        tokenId,
                        ownerAddress,
                        _,
                        priceInBPS,
                        otherArguments = {},
                      ] = id_to_market_item[key]?.arguments;
                      
                      if(tokenId !== "5") {
                        debugger;
                        
                        const cdetail = window.zilPay.contracts.at(nftAddress);
                      const secondDataFetch = await cdetail.getState();
                      const { token_uris = {}, token_name = "" } =
                        secondDataFetch;
                      console.log("secondDataModel", secondDataFetch);

                      let tokenImageDetails = JSON.parse(
                        token_uris[tokenId]?.replaceAll("'", '"')
                      )

                      productDetailsArr.push({
                        tokenId,
                        tokenImageDetails: tokenImageDetails,
                        tokenPrice: priceInBPS,
                        tokenName: token_name,
                        isItemSoldAlready:otherArguments?.constructor
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
                  cDetails = undefined;
                }
              };

              createcollection();
            });
          });
        } else {
          alert("Cannot find Zilpay");
        }
      }

      zill();
    }
  }, [x]);
  const onSearch = (searchText) =>{
    console.log("searchText",searchText)
    setfilterdProductsData( productsData.filter(productsObj => productsObj.tokenImageDetails.name.startsWith(searchText) ))
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Home productsData={filterdProductsData} onSearch={onSearch} />} />
        <Route
          path="/about/:productId"
          element={<ProductMoreDetails productsData={filterdProductsData} />}
        />
      </Routes>
    </>
  );
};

export default App;
