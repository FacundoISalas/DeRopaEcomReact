import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from './Item';
import Grid from '@mui/material/Grid';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const { itemId } = useParams();

  useEffect(() => {
    if (itemId) {
      const db = getFirestore();
      const itemRef = doc(db, 'items', itemId);

      getDoc(itemRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setProduct(data);
          } else {
            console.log("Item no encontrado");
          }
        })
        .catch((error) => {
          console.error('Error intentando recuperar el item:', error);
        });
    }
  }, [itemId]);

  return (
    <div>
      <Grid container spacing={2} marginTop={10}>
        <Grid item lg={12}>
          {product ? <Item product={product} isItemDetail={true} /> : <div>Cargando...</div>}
        </Grid>
      </Grid>
    </div>
  );
};

export default ItemDetailContainer;
