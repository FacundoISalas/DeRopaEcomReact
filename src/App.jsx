import React from 'react'; // eslint-disable-line
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';
import  { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<ItemListContainer />} />
        <Route path='/category/:categoryId' element={<ItemListContainer />} />
        <Route path='/item/:itemId' element={<itemDetailContainer />} />
        <Route path='*' element={ <h1> 404 Pagina no encontrada, por favor revise nuevamente la direccion ingresada </h1>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;