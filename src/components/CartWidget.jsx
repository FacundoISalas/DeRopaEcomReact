import React, { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../contexts/CartContext';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const CartWidget = () => {
  const { cartItems } = useContext(CartContext);

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // State to manage the visibility of the menu
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpenMenu}>
        <Badge badgeContent={itemCount} color="secondary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div style={{ padding: '10px', maxWidth: '200px' }}>
          <Typography variant="h6" gutterBottom>
            Shopping Cart
          </Typography>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.itemName} - {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      </Popover>
    </>
  );
};

export default CartWidget;
