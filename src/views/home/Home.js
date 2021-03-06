import { Container, Grid } from "@mui/material";
import React from "react";
import ProductCard from "../../components/ProductCard";
import Menubar from '../../components/menubar'

function Home(props) {
  const { productsData: productsToDisplay, onSearch } = props;
  const displayProducts = productsToDisplay.map((productData) => (
    <ProductCard props={productData}></ProductCard>
  ));

  return (
    <>
    <Menubar style={{ pointerEvents: "none" }} onSearch={onSearch} />
    <Container sx={{height: "100vh", width: "100vw", marginTop:"20px" }}>
      <Grid container spacing={2}>
        {displayProducts}
      </Grid>
    </Container>
    </>
    
  );
}

export default Home;
