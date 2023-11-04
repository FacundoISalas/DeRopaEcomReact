import React, { useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext.jsx';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ItemQuantity = ({ itemName, itemImage, itemPrice }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const handleMinus = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({ itemName, itemPrice, itemImage, quantity });
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', marginBottom: '15px' }}>
        <IconButton onClick={handleMinus}>
          <RemoveIcon />
        </IconButton>
        <TextField
          type="number"
          value={quantity}
          InputProps={{
            inputProps: {
                style: { textAlign: "center" },
            }
        }}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (!isNaN(value) && value >= 0) {
              setQuantity(value);
            }
          }}
        />
        <IconButton onClick={handlePlus}>
          <AddIcon />
        </IconButton>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button onClick={handleAddToCart} disabled={quantity === 0} variant="contained" color="primary">
          Añadir
        </Button>
      </div>
    </div>
  );
};

export default ItemQuantity;
