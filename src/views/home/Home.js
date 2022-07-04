import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";

function Home(props) {
  const { productsData: productsToDisplay } = props;
  const displayProducts = productsToDisplay.map((productData) => (
    <ProductCard props={productData}></ProductCard>
  ));

  return (
    <Container sx={{height: "100vh", width: "100vw" }}>
      <Grid container spacing={2}>
        {displayProducts}
      </Grid>
    </Container>
  );
}

export default Home;
