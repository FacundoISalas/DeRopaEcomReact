import React, { useContext, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext, useCart } from '../contexts/CartContext';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const CartWidget = () => {
  const { cartItems } = useContext(CartContext);
  const { removeFromCart } = useCart();

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const precioTotal = cartItems.reduce((total, item) => total + item.quantity * item.itemPrice, 0);
  const fixed2PrecioTotal = precioTotal.toFixed(2);

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
        <div style={{ padding: '10px', minWidth: '180px', maxWidth: '300px' }}>
          <Typography variant="h6" gutterBottom>
            Productos en el carrito:
          </Typography>
          {cartItems.length > 0 ? (
            <Box maxHeight={400} style={{ overflowY: 'auto' }}>
              <List>
                {cartItems.map((item, index) => (
                  <ListItem key={index}>
                    <Typography variant='body1'>
                      <b>Item:</b> {item.itemName} <b>/</b> <b>Cantidad:</b> {item.quantity} <b>/</b> <b>precio:</b> ${item.itemPrice}
                    </Typography>
                    <Tooltip title="Eliminar item">
                    <IconButton
                      onClick={() => removeFromCart(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    </Tooltip>
                  </ListItem>
                ))}
              </List>
            </Box>
          ) : (
            <Typography variant='body1' style={{ textAlign: 'center' }}>No hay productos aún.</Typography>
          )}
          <Box display="flex" justifyContent="center" marginY={ 2 }>
            <Typography variant="h6" gutterBottom>
              Precio total: ${fixed2PrecioTotal}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" marginY={ 2 }>
          <Link to={`/checkout`}>
            <Button variant="contained" color="primary">
              Finalizar Compra
            </Button>
            </Link>
          </Box>
        </div>
      </Popover>
    </>
  );
};

export default CartWidget;
