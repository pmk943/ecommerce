import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";
import { Box, Button, CardContent, Grid, Typography } from "@mui/material";
import { convertfromBpsToDollars } from "../utils/function";

export default function ProductCard({ props }) {
  const {
    tokenId,
    ownerAddress,
    isItemSoldAlready,
    tokenImageDetails,
    tokenPrice,
  } = props;
  const toLink = `/about/${tokenId}`;
  //todo move styles to Styles.ts

  return (
    <Grid item xs={12} md={6} lg={3}>
      <Link to={toLink} style={{ textDecoration: "none" }}>
        <Card
          elevation={3}
          sx={{
            border: "1px solid #29475A",
            borderRadius: "10px",
            minWidth: 150,
          }}
        >
          <CardMedia
            sx={{height:"294px",width:"294px",objectFit:"fit"}}
            component="img"
            image={tokenImageDetails.resources[0].uri}
            alt="Placeholder image"
          />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="h5">
                <strong>{tokenImageDetails.name}</strong>
              </Typography>
              <Typography>
                <strong>{convertfromBpsToDollars(tokenPrice)}</strong>
                <div style={{ display: "flex" }}>
                  <image src="https://meta.viewblock.io/ZIL/logo?t=dark" />
                </div>
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                margin: "8px 0px 4px 0px",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(222, 255, 255, 0.5)",
                  fontSize: 12,
                  fontFamily: "Avenir Next",
                  fontWeight: 600,
                }}
              >
                #{tokenId}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(222, 255, 255, 0.5)",
                    fontSize: 12,
                    fontFamily: "Avenir Next",
                    fontWeight: 600,
                    paddingRight:"2px"
                  }}
                >
                  tokenOwner
                </Typography>
                <Typography
                  sx={{ color: "#6BE1FF",maxWidth:"90px", overflow:"hidden", textOverflow: "ellipsis"}}
                  variant="h6"
                >
                  {ownerAddress}
                </Typography>
              </Box>
            </Box>
          </CardContent>
         
        </Card>
      </Link>
    </Grid>
  );
}
