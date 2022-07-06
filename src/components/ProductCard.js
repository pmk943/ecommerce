import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { convertfromBpsToDollars } from "../utils/function";

export default function ProductCard({ props }) {
  const {
    tokenId,
    isItemSoldAlready,
    tokenImageDetails,
    tokenPrice
  } = props;
  const toLink = `/about/${tokenId}`;
  //todo move it to utils later on

  return (
    <Grid item xs={12} md={6} lg={4}>
    <Link to={toLink} style={{ textDecoration: "none" }}>
        <Card elevation={3} sx={{border: '1px solid #29475A',borderRadius:"10px", minWidth: 150 }}>
          <CardHeader className="product-title" title={tokenImageDetails?.name} />
          <CardMedia
            component="img"
            height="194"
            image={tokenImageDetails.resources[0].uri}
            alt="Placeholder image"
          />
          {/* <CardContent>
        <div className="product-content" variant="body2" color="text.secondary">
           {props.product.short_description}
        </div>
      </CardContent> */}
          <CardActions disableSpacing>
            {isItemSoldAlready === "True" ? (
              <Button  color="error" variant="contained">
                {" "}
                Item is sold already
              </Button>
            ) : (
              <Button variant="contained">Buy Now</Button>
            )}
            <span style={{ marginLeft: "auto" }}>
              <strong>Price : {convertfromBpsToDollars(tokenPrice)}$</strong>
            </span>
          </CardActions>
        </Card>
    </Link>
    </Grid>
  );
}
