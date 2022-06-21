import React from 'react';
import './App.css';
import Home from './views/home/Home'
import { Routes, Route } from "react-router-dom";
import ProductMoreDetails from './views/productfulldetails/ProductMoreDetails';

const App = (props) => {
     
      return(
        <Home />
      //   <Routes>
      //   <Route path="/" element={<Home />} />
      //   <Route path="/about/:productId" element={<ProductMoreDetails />} />
      // </Routes>
      );
  
}

export default App;

