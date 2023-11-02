// ItemQuantity.js
import React, { useState, useContext } from 'react'; // eslint-disable-line
import { CartContext } from './CartContext'; // Replace with your actual context

const ItemQuantity = ({ itemName }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart } = useContext(CartContext);

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
      addItemToCart({ itemName, quantity });
    }
  };

  return (
    <div>
      <button onClick={handleMinus}>-</button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          if (!isNaN(value) && value >= 0) {
            setQuantity(value);
          }
        }}
      />
      <button onClick={handlePlus}>+</button>
      <button onClick={handleAddToCart} disabled={quantity === 0}>
        Add to Cart
      </button>
    </div>
  );
};

export default ItemQuantity;