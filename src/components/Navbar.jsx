import React, { useEffect, useRef } from 'react'; // eslint-disable-line
import CartWidget from './CartWidget';

const Navbar = () => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    M.AutoInit(); // eslint-disable-line
    M.Dropdown.init(dropdownRef.current, { constrainWidth: false }); // eslint-disable-line
  }, []);

  return (
    <nav>
      <div className="nav-wrapper">
        <img width={32} height={32} src="src\assets\jacket.svg" alt="de ropa logo"/>
        <a href="#" className="brand-logo">De ropa</a>
        <a href="#" data-target="nav-mobile" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a
              className="dropdown-trigger"
              href="#"
              data-target="category-dropdown"
            >
              Categorias <i className="material-icons right">arrow_drop_down</i>
            </a>
            <ul id="category-dropdown" className="dropdown-content">
              <li><a href="#">Camisas</a></li>
              <li><a href="#">Camperas</a></li>
              <li><a href="#">Jeans</a></li>
              <li><a href="#">Zapatillas</a></li>
            </ul>
          </li>
          <li>
            <a>
              <CartWidget />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;