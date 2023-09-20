import React from 'react'; // eslint-disable-line
import Navbar from './components/Navbar';
import ItemListContainer from './components/ItemListContainer';

function App() {
  return (
    <div>
      <Navbar />
      <ItemListContainer greetings={'ItemListContainer Hola mundo'} />
    </div>
  );
}

export default App;