const BASE_URL = 'http://localhost:5000/api/products';

export async function getAllProducts() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
}
