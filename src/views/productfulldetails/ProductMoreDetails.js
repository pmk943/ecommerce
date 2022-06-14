import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import getProductData from '../../services/getProductsData';
import './ProductMoreDetails.css'

function ProductMoreDetails() {
    const [productSpecificDetails, setproductSpecificDetails] = useState([])

    useEffect(() => {
        (async function (){
            // todo -> have a different method to fetch the specific details of the product using the id
            const data= await getProductData()
            setproductSpecificDetails(data)
            debugger;
            console.log(data)
        }) ();
    }, [])
    let params = useParams();
    const productToShow = productSpecificDetails.filter((product) =>product.id === params.productId)[0]
    if(!productToShow){
        return '';
    }
    return (
    <div className="fullproduct-container">
                <div className="product-left">
                    <figure className="image is-4by3">
                        <img src={productToShow?.image} alt="Product image" width="450px" height="450px"></img>
                    </figure>
                </div>
                <div className="product-right">
                    <p className="product-title">{productToShow.name}</p>
                    <div className="product-detailed-description">
                       <ol>
                       {productToShow.bullet_description.map((description)=><li>{description} <br/></li>)}</ol> 
                    </div>
                    <Button onClick={()=>alert(`you are trying to buy ${productToShow.name}`)} variant="contained">Buy Now</Button>
                </div>
            </div>
    
  )
}

export default ProductMoreDetails