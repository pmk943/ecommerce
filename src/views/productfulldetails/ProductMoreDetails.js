import { Box, Button, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";
import AttributesTable from "../../components/attributes-table";
import { convertfromBpsToDollars } from "../../utils/function";
import { toast, Toaster } from "react-hot-toast";
import transitionMessageAlert from "../../utils/functions/transitionMessageAlert";
import { decodeZilPayError } from "../../utils/functions/decodeMessage";
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
    try {
      debugger;
      const { contracts, utils } = window.zilPay;
      // const deployedContract = contracts.at(
      //   "0x60653dff3a02f5e966c4580c76a0266ba1965714"
      // );
      //const amount = utils.units.fromQa(2500000000000, utils.units.Units.Zil);
      const amount = 2500000000000;
      const gasPrice = utils.units.toQa(1000, utils.units.Units.Li);
      debugger;
      // Sending to DS
      const contract = contracts.at(
        "0x60653dff3a02f5e966c4580c76a0266ba1965714"
      );

      const callTx = await contract.call(
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
          gasLimit: utils.Long.fromNumber(9000),
        },
        true
      );
      console.log("callTX", callTx);
      debugger;
      transitionMessageAlert(window.zilPay, callTx.ID, "Please wait while we confirm your purchase");
      debugger;
    } catch (error) {
      toast.error(decodeZilPayError(error));
    }
    // const confirmedTxn = await callTx.confirm(callTx.id);

    // console.log(`The transaction status is:`);
    // console.log(confirmedTxn.receipt);
    // if (confirmedTxn.receipt.success === true) {
    //   console.log(`buy is success: ${deployedContract.address}`);
    //   debugger;
    // } else {
    //   console.log("buy is failed");
    //   debugger;
    // }
  };

  return (
    <Container style={{ marginTop: "10px" }}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Box>
            <img
              src={tokenImageDetails.resources[0].uri}
              alt="Product"
              width="450px"
              height="450px"
              style={{ border: "1px solid #29475A", borderRadius: "10px" }}
            ></img>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p className="product-title">{tokenImageDetails?.name}</p>
            {isItemSoldAlready === "True" ? (
              <Button
                style={{ height: "30px" }}
                color="error"
                variant="contained"
              >
                Item is sold already
              </Button>
            ) : (
              <Button
                style={{ height: "30px" }}
                onClick={onBuynowClick}
                variant="contained"
              >
                Buy Now for {convertfromBpsToDollars(tokenPrice)}$
              </Button>
            )}
          </Box>
          <Box sx={{ border: "1px solid #29475A", borderRadius: "10px" }}>
            <AttributesTable data={tokenImageDetails.attributes} />
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box sx={{ border: "1px solid #29475A", borderRadius: "10px" }}>
            {" "}
            About info goes here
          </Box>
        </Grid>
      </Grid>
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
}

export default ProductMoreDetails;
