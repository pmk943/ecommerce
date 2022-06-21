import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

function Home() {
  const [productsData, setProductsData] = useState([]);
  const [productsToDisplay, setProductsToDisplay] = useState([])
  console.log("urisstate", productsData);
  let x =1;
  useEffect(() => {
    if(x === 1){
      console.log('xx',x)
      x++;
      function zill() {
        if (window.zilPay) {
          window.zilPay.wallet.connect().then(() => {
            console.log(window.zilPay.wallet.defaultAccount);
            const addr = window.zilPay.wallet.defaultAccount.bech32;
            console.log(addr);
            //Query blockchain for balance
            window.zilPay.blockchain.getBalance(addr).then( (resp) => {
              let myInitObject = resp.result["balance"];
              console.log(myInitObject);
              const createcollection = async() => {
                // var cName = "0x72af046df15baea42974395ae601b4e42b18b9a5"; //prompt("Please enter Collection Name");
                const cName = "0x8cac23a93c933a81d03a5d86c5433af46db8af7d";
                const cDetails = window.zilPay.contracts.at(cName);
                console.log("cDetails",cDetails);
  
                // const spName = "0x8cac23a93c933a81d03a5d86c5433af46db8af7d";
                // const spDetails = window.zilPay.contracts.at(spName);
  
                if (cDetails) {
                  try {
                    let uris_arr = [];
                    const firstData = await cDetails.getState()
                    const { id_to_market_item } = firstData;
                    for (const key in id_to_market_item) {
                      const [nftAddress, id] = id_to_market_item[key].arguments;
                      console.log("state_id", nftAddress, id);
                      const cdetail = window.zilPay.contracts.at(nftAddress);
                      const secondDataFetch =await cdetail.getState()
                      uris_arr.push(secondDataFetch.token_uris[id]);
                    }
                    setProductsData(uris_arr);
                    // cDetails.getState().then((stateData) => {
                    //   console.log("state_first", stateData);
                    //   const { id_to_market_item } = stateData;
                    //   console.log("state_uris_beforesettingState", uris_arr);
                    //   setProductsData(uris_arr);
    
                    //   // cDetails.getInit().then(function (x) {
                    //   //   if (spDetails) {
                    //   //     spDetails.getState().then( (stateData) => {
                    //   //       console.log("state_second",stateData)
                    //   //       var spObject = stateData;
    
                    //   //       var Objectsmsp = spObject.id_to_market_item;
                    //   //       // loadGallery(false);
                    //   //     });
                    //   //   } else {
                    //   //     alert("Please load contract first");
                    //   //     return;
                    //   //   }
                    //   //   //mpGallery()
                    //   // }
                    //   // );
                    // });
                  }
                  catch(err) {
                    console.log("error occured", err)
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

  // const renderTile = (id,productOwner, productUri) => {
  //   // const productCardProps= {id, productOwner, productUri}
  // return <ProductCard id={id} productOwner={productOwner} productUri={productUri}></ProductCard>;
  // };
  const renderTile = (uri) => {
    // const productCardProps= {id, productOwner, productUri}
    console.log("state_main", productsData);
    return <ProductCard uri={uri}></ProductCard>;
  };

  useEffect(()=>{

  setProductsToDisplay(productsData.map((uri) => renderTile(uri)))

  },[productsData])

   
  // Object.entries(productsData.token_owners).forEach(([id, owner]) => {
  //     const product_uri = productsData.token_uris[id]
  //     ProductsToDisplay.push(renderTile(id,owner, product_uri))
  // })
  // for (let i = 0; i < productsData.token_owners.values.length; i++) {
  //   const current_item = productsData[i];
  //   ProductsToDisplay.push(renderTile(current_item));
  // //  debugger;
  // }
  return (
    <div className="home-container">
      <div id="wrapper">
        <div id="product-catalog">{productsToDisplay}</div>
      </div>
    </div>
  );
}

export default Home;
