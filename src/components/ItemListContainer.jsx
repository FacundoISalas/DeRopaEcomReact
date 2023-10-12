import React, { useEffect, useState } from 'react'; // eslint-disable-line
import { useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ItemListContainer = ({ greetings }) => {
  const { categoryId } = useParams()

  const [products, setProducts] = useState([])

  useEffect(() => {
    if (categoryId) {
      console.log('callByCategory');
    } else {
      console.log('callAll');
    }
  });


  return (
    <div>
      <h2>{greetings}</h2>
    </div>
  );
};

export default ItemListContainer;
