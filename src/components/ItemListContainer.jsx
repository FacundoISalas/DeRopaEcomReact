import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import { collection, getDocs, query, where, doc, getFirestore } from 'firebase/firestore';

const ItemListContainer = ({ greetings }) => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    const productsCollection = collection(db, 'items');

    const fetchAll = categoryId ? false : true;

    if (fetchAll) {
      getDocs(productsCollection)
        .then((querySnapshot) => {
          const productsData = [];
          querySnapshot.forEach((doc) => {
            productsData.push({ id: doc.id, ...doc.data() });
          });
          setProducts(productsData);
        })
        .catch((error) => {
          console.error('Error al intentar recuperar items', error);
        });
    } else {
      const categoryRef = doc(db, 'categories', categoryId);
      const q = query(productsCollection, where('categoryRef', '==', categoryRef));
      getDocs(q)
        .then((querySnapshot) => {
          const productsData = [];
          querySnapshot.forEach((doc) => {
            productsData.push({ id: doc.id, ...doc.data() });
          });
          setProducts(productsData);
        })
        .catch((error) => {
          console.error('Error al intentar recuperar items:', error);
        });
    }
  }, [categoryId]);

  return (
    <div>
      <h2>{greetings}</h2>
      <ItemList products={products} />
    </div>
  );
};

export default ItemListContainer;
