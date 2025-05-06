import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img1 from "F:/PROJECTS/consultancy/exp-10/src/components/basmati.jpeg";
import img2 from "F:/PROJECTS/consultancy/exp-10/src/components/Jasmine.jpeg";
import img3 from "F:/PROJECTS/consultancy/exp-10/src/components/red1.jpeg";
import img4 from "F:/PROJECTS/consultancy/exp-10/src/components/mogra.jpeg";
import img5 from "F:/PROJECTS/consultancy/exp-10/src/components/brown.jpeg";
import img6 from "F:/PROJECTS/consultancy/exp-10/src/components/black.jpeg";
import img7 from "F:/PROJECTS/consultancy/exp-10/src/components/Sona.jpeg";
import img8 from "F:/PROJECTS/consultancy/exp-10/src/components/Ambemohar.jpeg";
import img9 from "F:/PROJECTS/consultancy/exp-10/src/components/kala.jpeg";
import img10 from "F:/PROJECTS/consultancy/exp-10/src/components/Bambo.jpeg";
const products = [
  { id: 1, name: "Basmati Rice", description: "Description 1", price: 100, imageUrl: img1 },
  { id: 2, name: "Jasmine Rice", description: "Description 2", price: 150, imageUrl: img2 },
  { id: 3, name: "Red Rice", description: "Description 3", price: 200, imageUrl: img3 },
  { id: 4, name: "Mogra Rice", description: "Description 4", price: 250, imageUrl: img4 },
  { id: 5, name: "Brown Rice", description: "Description 5", price: 300, imageUrl: img5 },
  { id: 6, name: "Black Rice", description: "Description 6", price: 350, imageUrl: img6 },
  { id: 7, name: "Sona Masuri Rice", description: "Description 7", price: 400, imageUrl: img7},
  { id: 8, name: "Ambemohar Rice", description: "Description 8", price: 450, imageUrl: img8 },
  { id: 9, name: "Kala Jeera Rice", description: "Description 9", price: 500, imageUrl: img9},
  { id: 10, name: "Bamboo Rice", description: "Description 10", price: 550, imageUrl: img10 },
];

const Product = () => {
  const { addToCart } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    quantity: 1,
  });

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userDetails.name || !userDetails.email || !userDetails.phone || !userDetails.address) {
      toast.error('Please fill out all fields');
      return;
    }
  
    const orderDetails = {
      productName: selectedProduct.name,
      description: selectedProduct.description,
      totalPrice: selectedProduct.price * userDetails.quantity,
      quantity: userDetails.quantity,
      userDetails: {
        name: userDetails.name,
        email: userDetails.email,
        phone: userDetails.phone,
        address: userDetails.address,
      },
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });
  
      if (response.ok) {
        const data = await response.json();
        toast.success('Order placed successfully!');
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
        setUserDetails({
          name: '',
          email: '',
          phone: '',
          address: '',
          quantity: 1,
        });
      } else {
        const errorData = await response.json();
        toast.error('Failed to place order: ' + errorData.message);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Fetch request was aborted');
        toast.error('Request aborted');
      } else {
        console.error('Network Error:', error.message);
        toast.error('Network error placing order. Please check your internet connection or try again later.');
      }
    }
  
    setShowForm(false);
  };
  
  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart successfully!`);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#ADD8E6', // Light blue color
        padding: '20px',
      }}
    >
      <div className="container mx-auto px-4 py-8 pt-20">
        <h2
          className="text-2xl font-bold mb-6 text-center"
          style={{
            animation: 'bounce 1s infinite',
          }}
        >
          Our Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              style={{
                animation: 'fadeIn 0.5s ease-in-out',
              }}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-xl font-bold text-gray-900 mt-2">₹{product.price}</p>
              <div className="flex flex-col space-y-2 mt-4">
                <button
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
                  onClick={() => handleBuyNow(product)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {showForm && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
              style={{
                animation: 'slideIn 0.5s ease-in-out',
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{selectedProduct.name}</h3>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-500 hover:text-gray-900"
                >
                  X
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={userDetails.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={userDetails.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={userDetails.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-semibold mb-2">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={userDetails.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="quantity" className="block text-sm font-semibold mb-2">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    value={userDetails.quantity}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Submit Order
                </button>
              </form>
            </div>
          </div>
        )}

        <hr className="my-8 border-t border-gray-300" />
        <footer className="mt-8 bg-black text-white text-center py-4">
          <p>&copy; 2025 Rice Shop, All Rights Reserved</p>
        </footer>

        {/* ToastContainer for displaying notifications */}
        <ToastContainer
          position="top-right"
          autoClose={3000} // Close after 3 seconds
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </div>
  );
};

export default Product;     