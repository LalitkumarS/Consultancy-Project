import React, { useEffect, useState } from "react";
import { Table, Container, Alert, Button } from "react-bootstrap";
import axios from "axios";

const Admin = () => {
  const [orders, setOrders] = useState([]); // Ensuring orders is initialized as an empty array
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  // Fetch all orders on component load
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        if (Array.isArray(response.data)) {
          setOrders(response.data); // Setting fetched orders
        } else {
          console.error("Unexpected response format:", response.data);
          setOrders([]); // Handle cases where response is not as expected
        }
      } catch (err) {
        setError("Failed to fetch orders. Please try again later.");
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  // Mark order as completed
  const handleComplete = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: "Completed" } : order
        )
      );
      setSuccess("Order status updated to completed.");
      setTimeout(() => setSuccess(""), 3000); // Clear success message
    } catch (err) {
      setError("Failed to update order status.");
      console.error(err);
    }
  };

  return (
    <Container>
      <br />
      <br />
      <h2 className="my-4">ORDERS</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Rice Variety</th>
            <th>Quantity(KG)</th>
            <th>Total Price</th>
            <th>User Name</th>
            <th>Order At</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order._id}>
                <td>{order._id}</td>
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
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  {order.status !== "Completed" ? (
                    <Button
                      variant="success"
                      onClick={() => handleComplete(order._id)}
                    >
                      Mark as Completed
                    </Button>
                  ) : (
                    <span>Completed</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No orders available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Admin;
