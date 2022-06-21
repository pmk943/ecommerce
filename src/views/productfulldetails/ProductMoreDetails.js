import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import getProductData from '../../services/getProductsData';
import './ProductMoreDetails.css'

// this page wont work currently as we are only getting the image and no data to display
function ProductMoreDetails() {
    let params = useParams();
    const [productSpecificDetails, setproductSpecificDetails] = useState({})
    // console.log(productSpecificDetails?.token_owners ? productSpecificDetails?.token_owners[params.productId] : '')
  
let x=1;
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
                          setproductSpecificDetails(uris_arr);
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
    }, [x])
    const productToShow = productSpecificDetails.filter((product) =>product.id === params.productId)[0]
    if(!productToShow){
        return '';
    }

    if(Object.keys(productSpecificDetails).length === 0){
        alert('empty object')
        return ''
    }
    console.log("che",productSpecificDetails.token_owners[params.productId])
    return (
    <div className="fullproduct-container">
                <div className="product-left">
                    <figure className="image is-4by3">
                        <img src={productSpecificDetails?.token_uris[params.productId]} alt="Product image" width="450px" height="450px"></img>
                    </figure>
                </div>
                <div className="product-right">
                    {productSpecificDetails.token_owners[params.productId]}
                    {/* <p className="product-title">{productToShow.name}</p>
                    <div className="product-detailed-description">
                       <ol>
                       {productToShow.bullet_description.map((description)=><li>{description} <br/></li>)}</ol> 
                    </div> */}
                    {/* <Button onClick={()=>alert(`you are trying to buy ${productToShow.name}`)} variant="contained">Buy Now</Button> */}
                </div>
            </div>
    
  )
}

export default ProductMoreDetails