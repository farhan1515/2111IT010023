import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  if (!product) {
    return <div>No product information available.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to Products
      </button>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
        <p className="text-xl mb-2">
          Price: <span className="font-medium text-green-600">${product.price}</span>
        </p>
        <p className="text-xl mb-2">
          Rating: <span className="font-medium text-yellow-600">{product.rating}</span>
        </p>
        <p className="text-xl mb-2">
          Discount: <span className="font-medium text-red-600">{product.discount}%</span>
        </p>
        <p className="text-xl mb-2">
          Availability: <span className={`font-medium ${product.availability === 'yes' ? 'text-green-600' : 'text-red-600'}`}>{product.availability}</span>
        </p>
        {/* Add more details here if available */}
      </div>
    </div>
  );
};

export default ProductDetail;