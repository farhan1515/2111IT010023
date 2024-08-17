import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    company: 'AMZ',
    category: 'Laptop',
    minPrice: 1,
    maxPrice: 10000,
    top: 10,
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://20.244.56.144/test/companies/${filters.company}/categories/${filters.category}/products`,
        {
          params: {
            top: filters.top,
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err, 'error');
      if (err.response && err.response.status === 401) {
        try {
          const res = await axios.post('http://20.244.56.144/test/auth', {
            "companyName": "gdsTest",
            "clientID": "955ded6b-349c-40d6-ab38-47c03531f028",
            "clientSecret": "uSnvIMsDCtkfehBn",
            "ownerName": "Farhan",
            "ownerEmail": "2111IT010023@mallareddyuniversity.ac.in",
            "rollNo": "2111IT010023"
          });
          
          if (res.data && res.data.access_token) {
            localStorage.setItem('access_token', res.data.access_token);
            // Retry the original request
            fetchProducts();
            return;
          } else {
            throw new Error('Failed to refresh token');
          }
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          setError('Error refreshing authentication. Please try logging in again.');
          toast.error('Authentication failed. Please log in again.');
        }
      } else {
        setError('Error fetching products. Please try again.');
        toast.error('Error fetching products');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-2xl">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8 text-center">Top {filters.top} Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <label className="flex flex-col">
          Company:
          <select
            name="company"
            value={filters.company}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="AMZ">AMZ</option>
            <option value="FLP">FLP</option>
            <option value="SNP">SNP</option>
            <option value="MYN">MYN</option>
            <option value="AZO">AZO</option>
          </select>
        </label>
        <label className="flex flex-col">
          Category:
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="Phone">Phone</option>
            <option value="Computer">Computer</option>
            <option value="TV">TV</option>
            <option value="Earphone">Earphone</option>
            <option value="Tablet">Tablet</option>
            <option value="Charger">Charger</option>
            <option value="Mouse">Mouse</option>
            <option value="Keypad">Keypad</option>
            <option value="Bluetooth">Bluetooth</option>
            <option value="Pendrive">Pendrive</option>
            <option value="Remote">Remote</option>
            <option value="Speaker">Speaker</option>
            <option value="Headset">Headset</option>
            <option value="Laptop">Laptop</option>
            <option value="PC">PC</option>
          </select>
        </label>
        <label className="flex flex-col">
          Min Price:
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="flex flex-col">
          Max Price:
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="flex flex-col">
          Top N:
          <input
            type="number"
            name="top"
            value={filters.top}
            onChange={handleFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <li key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
            <Link to={`/product/${index}`} state={{ product }}>
              <h3 className="text-xl font-semibold mb-2">{product.productName}</h3>
              <p className="text-gray-600 mb-1">
                Price: <span className="font-medium text-green-600">${product.price}</span>
              </p>
              <p className="text-gray-600 mb-1">
                Rating: <span className="font-medium text-yellow-600">{product.rating}</span>
              </p>
              <p className="text-gray-600 mb-1">
                Discount: <span className="font-medium text-red-600">{product.discount}%</span>
              </p>
              <p className="text-gray-600">
                Availability: <span className={`font-medium ${product.availability === 'yes' ? 'text-green-600' : 'text-red-600'}`}>{product.availability}</span>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;