import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

import ItemQuantity from './ItemQuantity.jsx';

const Item = ({ product, isItemDetail }) => {
  const { name, image, description, price, stock, id } = product;

  return (
    <div style={{ height: '100%', marginTop: '25px' }}>
      <Card style={{ height: '100%' }}>
        <CardMedia
          component="img"
          alt={name}
          height="280"
          image={image}
          name={name}
          style={{ objectFit: 'contain' }}
        />
        <CardContent style={{ height: '100%' }}>
          <Typography variant="h5" component="div" style={{ textAlign: 'center' }}>
            {name}
          </Typography>
          <Box marginY={ 2 }>
            <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center' }}>
              {description}
            </Typography>
          </Box>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" color="primary">
              ${price} ARS
            </Typography>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', marginBottom: '15px' }}>
            <ItemQuantity itemName={name} itemImage={image} itemPrice={price}  itemDescription={description} itemId={id} itemStock = {stock} />
          </div>
          {isItemDetail ? <span></span> : <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link to={`/item/${id}`}>
              <Button>Ver detalle</Button>
            </Link>
          </div>}
        </CardContent>
      </Card>
    </div>
  );
};

export default Item;
