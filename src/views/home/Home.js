import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

function Home(props) {
  const { productsData: productsToDisplay } = props;
  const displayProducts = productsToDisplay.map((productData) => (
    <ProductCard props={productData}></ProductCard>
  ));

  return (
    <Container sx={{ bgcolor: "#0D1B24", height: "100vh", minWidth: "90vw" }}>
      <Grid container spacing={2}>
        {displayProducts}
      </Grid>
    </Container>
  );
}

export default Home;
