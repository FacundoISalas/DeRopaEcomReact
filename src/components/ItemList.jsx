import React from 'react';
import Grid from '@mui/material/Grid';
import Item from './Item';

const ItemList = ({ products }) => {
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Item product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ItemList;
