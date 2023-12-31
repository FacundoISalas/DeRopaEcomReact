import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';  
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Hidden from '@mui/material/Hidden';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CartWidget from './CartWidget';
import { Link } from 'react-router-dom';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [categories, setCategories] = useState([]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const db = getFirestore();
    const categoriesCollection = collection(db, 'categories');
    
    getDocs(categoriesCollection).then((snapshot) => {
      const categoryData = [];
      snapshot.forEach((doc) => {
        categoryData.push({ id: doc.id, ...doc.data() });
      });
      setCategories(categoryData);
    });
  }, []);

  return (
    <AppBar position="static">
      <Toolbar>
      <Link to={'/'} style={{ display: 'flex', alignItems: 'center', marginRight: 'auto', textDecoration: 'none', color: 'inherit' }}>
        <img width={32} height={32} src="src\assets\jacket.svg" alt="De ropa logo" />
        <Typography variant="h5" component="div" ml={2}>
          De ropa
        </Typography>
      </Link>
        <Hidden mdUp>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <Button color="inherit" onClick={handleMenuOpen}>
            Categorias <ArrowDropDownIcon />
          </Button>
        </Hidden>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {categories.map((category) => (
            <Link onClick={handleMenuClose} key={category.id} to={`/category/${category.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <MenuItem>{category.name}</MenuItem>
            </Link>
          ))}
        </Menu>
        <CartWidget itemCount={5} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
