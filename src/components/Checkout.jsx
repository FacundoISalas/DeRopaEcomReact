import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, TextField, Typography, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, Snackbar, Alert, Tooltip, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CartContext } from '../contexts/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { addDoc, collection, getFirestore, updateDoc, doc } from 'firebase/firestore';

const Checkout = () => {
  const { cartItems, removeFromCart, resetCart } = useContext(CartContext);
  const navigate = useNavigate();
  const handleSnackbarClose = () => {
    navigate('/');
  };
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.quantity * item.itemPrice;
  }, 0);

  const [nombre, setNombre] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

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
  const setDatosCompra = (items) => {
    let arrayCompra = [];
    for (let i = 0; i < items.length; i++) {
        const e = items[i];
        const objCompra = {
            name: e.itemName,
            description: e.itemDescription,
            price: e.itemPrice,
            quantity: e.quantity,
        };
        arrayCompra.push(objCompra);
    }
    return arrayCompra;
}
  useEffect(() => {
    if (nombre.trim() !== '' && telefono.trim() !== '' && email.trim() !== '' && !nombreError && !telefonoError && !emailError) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [nombre, telefono, email, nombreError, telefonoError, emailError]);

  const handleConfirmOrder = async () => {
    setIsPosting(true);
    const order = {
      datosCliente: { name: nombre, telefono: telefono, email: email },
      datosCompra: setDatosCompra(cartItems),
      total: totalPrice
    };
    const db = getFirestore();
    const ordersCollection = collection(db, 'orders');
  
    try {
      for (const item of cartItems) {
        console.log('itemData', item);
        const updatedStock = item.itemStock - item.quantity;
        const itemRef = doc(db, 'items', item.itemId);
        await updateDoc(itemRef, { stock: updatedStock });
      }
      await addDoc(ordersCollection, order);
  
      setTimeout(() => {
        resetCart();
        setIsPosting(false);
      }, 3100);
    } catch (error) {
      console.error('Error al intentar actualizar los datos y añadir una nueva orden:', error);
      setIsPosting(false);
    }
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
            {cartItems.map((item, index) => (
                <ListItem key={index}>
                <ListItemAvatar>
                    <Avatar alt={item.itemName} src={item.itemImage} />
                </ListItemAvatar>
                <ListItemText
                    primary={item.itemName}
                    secondary={
                    <>
                        <Typography variant="body2">{item.itemDescription}</Typography>
                        <Typography variant="body2">Cantidad: {item.quantity}</Typography>
                        <Typography variant="body2">Precio: ${item.itemPrice}</Typography>
                    </>
                    }
                />
                <div>
                <Tooltip title="Eliminar item">
                    <IconButton
                      onClick={() => removeFromCart(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    </Tooltip>
                </div>
                </ListItem>
            ))}
            </List>
            <Typography variant="h6" gutterBottom>
              Precio total: ${totalPrice}
            </Typography>
            <LoadingButton loading={isPosting}  variant="contained" color="primary" onClick={handleConfirmOrder} disabled={isDisabled || cartItems.length === 0 || isPosting}>
              Confirmar compra
            </LoadingButton>
            <Snackbar
              open={isPosting}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                Su compra se ha procesado correctamente, sera redirigo al inicio de la pagina.
              </Alert>
            </Snackbar>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Checkout;
