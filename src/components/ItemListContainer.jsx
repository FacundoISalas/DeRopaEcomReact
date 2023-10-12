import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';

const ItemListContainer = ({ greetings }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const apiUrl = categoryId
      ? `https://fakestoreapi.com/products/category/${categoryId}`
      : 'https://fakestoreapi.com/products';

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [categoryId]);

  return (
    <div>
      <h2>{greetings}</h2>
      <ItemList products={products} />
    </div>
  );
};

export default ItemListContainer;
