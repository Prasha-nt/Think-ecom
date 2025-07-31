import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching products');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
      {products.map(product => (
        <Link
          to={`/products/${product._id}`}
          key={product._id}
          style={{ border: '1px solid #ccc', padding: '15px', textDecoration: 'none', color: '#000' }}
        >
          <h3>{product.name}</h3>
          <p>Price: ₹{product.price}</p>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
