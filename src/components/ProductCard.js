import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button, Paper } from '@mui/material';



export default function ProductCard({uri}) {
  const toLink = `/about/${8}`
  return (
    <Link to={toLink} style={{ textDecoration: 'none' }}>
      <Card elevation={3} sx={{ maxWidth: 450 }}>
      <CardHeader
        className="product-title"
        title="staticHeader"
      />
      <CardMedia
        component="img"
        height="194"
        image={uri}
        alt="Placeholder image"
      />
      {/* <CardContent>
        <div className="product-content" variant="body2" color="text.secondary">
           {props.product.short_description}
        </div>
      </CardContent> */}
      <CardActions disableSpacing>
        <Button variant="contained">Buy Now</Button>
        <span style={{marginLeft:'auto'}}>
          <strong>Price : "123$ static values"</strong>
        </span>
      </CardActions>
    </Card>
    </Link>
    
  );
}
