import { Box, Button, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
import AttributesTable from "../../components/attributes-table";
import { convertfromBpsToDollars } from "../../utils/function";
import { BN, Long, bytes, units } from "@zilliqa-js/util";
import { Zilliqa } from "@zilliqa-js/zilliqa";
import { toBech32Address, getAddressFromPrivateKey } from "@zilliqa-js/crypto";
const zilliqa = new Zilliqa("https://dev-api.zilliqa.com");
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
    //const { contracts, utils } = window.zilPay;
    const deployedContract = zilliqa.contracts.at(
      "0x60653dff3a02f5e966c4580c76a0266ba1965714"
    );
    //const amount = utils.units.fromQa(2500000000000, utils.units.Units.Zil);
    const amount = 2500000000000;
    const gasPrice = units.toQa(1000, units.Units.Li);

    // Sending to DS

    const callTx = await deployedContract.callWithoutConfirm(
      "createMarketSale",
      [
        {
          vname: "item_id",
          type: "Uint256",
          value: tokenId,
        },
      ],
      {
        amount,
        gasPrice,
        gasLimit: Long.fromNumber(9000),
      },
      true
    );
    const confirmedTxn = await callTx.confirm(callTx.id);

    console.log(`The transaction status is:`);
    console.log(confirmedTxn.receipt);
    if (confirmedTxn.receipt.success === true) {
      console.log(`buy is success: ${deployedContract.address}`);
      debugger;
    } else {
      console.log("buy is failed");
      debugger;
    }
  };
  console.log("che",productToShow.token_owners[params.productId])
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box>
            <figure>
              <img
                src={tokenImageDetails.resources[0].uri}
                alt="Product"
                width="450px"
                height="450px"
                style={{ border: "1px solid #29475A", borderRadius: "10px" }}
              ></img>
            </figure>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <p className="product-title">{tokenName}</p>
          {isItemSoldAlready === "True" ? (
            <Button color="error" variant="contained">
              Item is sold already
            </Button>
          ) : (
            <Button onClick={onBuynowClick} variant="contained">
              Buy Now for {convertfromBpsToDollars(tokenPrice)}$
            </Button>
          )}
        </Grid>
        <Grid item xs={5}>
          <Box sx={{ border: "1px solid #29475A", borderRadius: "10px" }}>
            {" "}
            About info goes here
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box sx={{ border: "1px solid #29475A", borderRadius: "10px" }}>
            <AttributesTable data={tokenImageDetails.attributes} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductMoreDetails;
