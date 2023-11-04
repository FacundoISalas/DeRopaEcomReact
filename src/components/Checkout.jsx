import React, { useState, useContext, useEffect } from 'react';
import { Grid, TextField, Button, Typography, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { CartContext } from '../contexts/CartContext';

const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.quantity * item.itemPrice;
  }, 0);

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [nombreError, setNombreError] = useState(''); // Initialize with an empty string
  const [telefonoError, setTelefonoError] = useState(''); // Initialize with an empty string
  const [emailError, setEmailError] = useState(''); // Initialize with an empty string
  const [isDisabled, setIsDisabled] = useState(true);

  // Initialize error messages based on initial values
  useEffect(() => {
    if (nombre.trim() === '') {
      setNombreError('el campo es requerido');
    }
    if (telefono.trim() === '') {
      setTelefonoError('el campo es requerido');
    }
    if (email.trim() === '') {
      setEmailError('el campo es requerido');
    }
  }, []);

  const handleNombreChange = (event) => {
    const value = event.target.value;
    setNombre(value);

    if (value.trim() === '') {
      setNombreError('el campo es requerido');
    } else {
      setNombreError('');
    }
  };

  const handleTelefonoChange = (event) => {
    const value = event.target.value;
    setTelefono(value);

    if (value.trim() === '') {
      setTelefonoError('el campo es requerido');
    } else {
      setTelefonoError('');
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);

    if (value.trim() === '') {
      setEmailError('el campo es requerido');
    } else {
      setEmailError('');
    }
  };

  useEffect(() => {
    if (nombre.trim() !== '' && telefono.trim() !== '' && email.trim() !== '' && !nombreError && !telefonoError && !emailError) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [nombre, telefono, email, nombreError, telefonoError, emailError]);

  const handleConfirmOrder = () => {
    console.log('Nombre:', nombre);
    console.log('Telefono:', telefono);
    console.log('Email:', email);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Informacion del cliente
            </Typography>
            <TextField
              label="Nombre"
              fullWidth
              margin="normal"
              value={nombre}
              onChange={handleNombreChange}
              error={!!nombreError}
              helperText={nombreError}
            />
            <TextField
              label="Telefono celular"
              fullWidth
              margin="normal"
              value={telefono}
              onChange={handleTelefonoChange}
              error={!!telefonoError}
              helperText={telefonoError}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Resumen de compra
            </Typography>
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.id}>
                  <ListItemAvatar>
                    <Avatar alt={item.itemName} src={item.itemImage} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.itemName}
                    secondary={
                      <React.Fragment>
                        <Typography variant="body2">{item.itemDescription}</Typography>
                        <Typography variant="body2">Cantidad: {item.quantity}</Typography>
                        <Typography variant="body2">Precio: ${item.itemPrice}</Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" gutterBottom>
              Precio total: ${totalPrice}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleConfirmOrder} disabled={isDisabled}>
              Confirmar compra
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Checkout;
