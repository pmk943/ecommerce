import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Button, Paper } from "@mui/material";
import { convertfromBpsToDollars } from "../utils/function";

export default function ProductCard({ props }) {
  const { tokenId,isItemSoldAlready, tokenImageDetails, tokenPrice, tokenName} = props;
  const toLink = `/about/${tokenId}`;
  //todo move it to utils later on
  
  return (
    <Link to={toLink} style={{ textDecoration: "none" }}>
      <Card elevation={3} sx={{ maxWidth: 450 }}>
        <CardHeader className="product-title" title={tokenName} />
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
          {isItemSoldAlready === 'True' ? <Button disabled color="error" variant="contained"> Item is sold already</Button>:<Button variant="contained">Buy Now</Button>}
          <span style={{ marginLeft: "auto" }}>
            <strong>Price : {convertfromBpsToDollars(tokenPrice)}$</strong>
          </span>
        </CardActions>
      </Card>
    </Link>
  );
}
