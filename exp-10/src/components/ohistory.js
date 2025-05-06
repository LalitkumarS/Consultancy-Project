import React, { useEffect, useState } from 'react';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from the backend when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error('Unexpected response format:', data);
          setOrders([]);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);
  
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <br /><br /><br /><br />
      <h2 className="text-3xl font-bold mb-6 text-center">Order Arrivals</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead className="bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Order ID</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Product Name</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Quantity</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Total Price</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Customer</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Email</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Order Placed At</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Delivery Date</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const deliveryDate = new Date(order.createdAt);
                deliveryDate.setDate(deliveryDate.getDate() + 3);

                return (
                  <tr key={order._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 text-gray-600">{order._id}</td>
                    <td>
                      {order.cartItems.length > 0 ? (
                        order.cartItems.map((item, idx) => (
                          <div key={idx}>
                            <strong>Product:</strong> {item.name} <br />
                            <strong>Price:</strong> ₹{item.price} <br />
                            <hr />
                          </div>
                        ))
                      ) : (
                        order.productName
                      )}
                    </td>
                    <td>{order.quantity || order.cartItems.length}</td>
                    <td>₹{order.totalPrice}</td>
                    <td>{order.userDetails.name}</td>
                    <td>{order.userDetails.email}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>{deliveryDate.toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-semibold">
                      {order.status === 'Completed' ? (
                        <span className="text-green-600">Delivered</span>
                      ) : (
                        <span className="text-blue-600">On Progress</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
