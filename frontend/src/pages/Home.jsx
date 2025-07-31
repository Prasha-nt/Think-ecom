// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>🛒 All Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            style={{
              border: '1px solid #ddd',
              padding: '16px',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#000'
            }}
          >
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
