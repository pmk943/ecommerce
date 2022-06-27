import { Button } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import AttributesTable from "../../components/attributes-table";
import { convertfromBpsToDollars } from "../../utils/function";
import "./ProductMoreDetails.css";

function ProductMoreDetails(props) {
  const { productsData } = props;
  let params = useParams();

  const productToShow = productsData.filter(
    (product) => product.tokenId === params.productId
  )[0];
  if (!productToShow) {
    return "";
  }
  if (Object.keys(productToShow).length === 0) {
    alert("empty object");
    return "";
  }
  const {
    tokenId,
    isItemSoldAlready,
    tokenImageDetails,
    tokenPrice,
    tokenName,
  } = productToShow;
  const onBuynowClick = async () => {
    const { contracts, utils } = window.zilPay;
    const contract = contracts.at("0x60653dff3a02f5e966c4580c76a0266ba1965714");
    //const amount = utils.units.fromQa(2500000000000, utils.units.Units.Zil);
    const amount = 2500000000000;
    const gasPrice = utils.units.toQa(1000, utils.units.Units.Li);

    // Sending to DS

    const data = await contract.call(
      "createMarketSale",
      [
        {
          vname: "item_id",
          type: "Uint256",
          value: productToShow.tokenId,
        },
      ],
      {
        amount,
        gasPrice,
        gasLimit: utils.Long.fromNumber(9000),
      },
      true
    );
    console.log("data", data);
    alert("data", data);
  };
  //console.log("che",productToShow.token_owners[params.productId])
  return (
    <div className="fullproduct-container">
      <div className="product-left">
        <figure className="image is-4by3">
          <img
            src={tokenImageDetails.resources[0].uri}
            alt="Product"
            width="450px"
            height="450px"
          ></img>
        </figure>
      </div>
      <div className="product-right">
        <p className="product-title">{tokenName}</p>
        {isItemSoldAlready === "True" ? (
          <Button disabled color="error" variant="contained">
            Item is sold already
          </Button>
        ) : (
          <Button onClick={onBuynowClick} variant="contained">
            Buy Now for {convertfromBpsToDollars(tokenPrice)}$
          </Button>
        )}
      </div>
      <div>
        <div>
          <h1> About info goes here</h1>
        </div>
        <div>
          <AttributesTable data={tokenImageDetails.attributes}/>
        </div>
      </div>
    </div>
  );
}

export default ProductMoreDetails;
