import React from 'react';
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

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <img width={32} height={32} src="src\assets\jacket.svg" alt="De ropa logo" />
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} ml={2}>
          De ropa
        </Typography>
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
          <MenuItem>Camisas</MenuItem>
          <MenuItem>Camperas</MenuItem>
          <MenuItem>Jeans</MenuItem>
          <MenuItem>Zapatillas</MenuItem>
        </Menu>
        <CartWidget itemCount={5}/>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
