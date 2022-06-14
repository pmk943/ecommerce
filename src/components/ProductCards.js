import React from 'react'
import { Link } from 'react-router-dom'


function ProductCard(props) {
    const toLink = `/about/${props.product.id}`
  return (
    <Link to={toLink} style={{ textDecoration: 'none' }}>
     <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={props.product.image} alt="Placeholder image"></img>
                    </figure>
                </div>
                <div className="card-content">
                    <p className="title product-title">{props.product.name}</p>
  
                    <div className="product-content">
                        {props.product.short_description}
                        <br></br>
                    </div>
                </div>
            </div>
        </Link >
           
   
  )
}

export default ProductCard