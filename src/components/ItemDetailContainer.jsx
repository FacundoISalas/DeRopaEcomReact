import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from './Item';
import Grid from '@mui/material/Grid';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const { itemId } = useParams();

  useEffect(() => {
    if (itemId) {
      fetch(`https://fakestoreapi.com/products/${itemId}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
        });
    }
  }, [itemId]);

  return (
    <div>
      <Grid container spacing={2} marginTop={10}>
        <Grid item lg={12}>
          {product ? <Item product={product} isItemDetail={ true } /> : <div>Cargando...</div>}
        </Grid>
      </Grid>
    </div>
  );
};

export default ItemDetailContainer;
