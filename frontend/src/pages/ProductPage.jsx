// src/pages/ProductPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error('Error fetching product:', err));
  }, [id]);

  if (!product) return <div>Loading product...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>← Back to Home</Link>
      <h2>{product.name}</h2>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Description:</strong> {product.description || 'No description available.'}</p>
    </div>
  );
};

export default ProductPage;
