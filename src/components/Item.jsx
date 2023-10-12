import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Item = ({ product, isItemDetail }) => {
  const { title, image, description, price, id } = product;

  return (
    <div style={{ height: '100%' }}>
      <Card style={{ height: '100%' }}>
        <CardMedia
          component="img"
          alt={title}
          height="280"
          image={image}
          title={title}
          style={{ objectFit: 'contain' }}
        />
        <CardContent style={{ height: '100%' }}>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'center'}}>
          <Typography variant="h6" color="primary">
            ${price} ARS
          </Typography>
          </div>
          { isItemDetail ? <span></span> : <div style={{ display: 'flex', justifyContent: 'center'}}>
          <Link to={`/item/${id}`}><Button>Ver detalle</Button></Link>
          </div> }
        </CardContent>
      </Card>
    </div>
  );
};

export default Item;
