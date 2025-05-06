import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Import Cart Context
import { Modal, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart, getTotalPrice } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  const handleOrderNow = () => {
    setShowOrderForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!userDetails.name) errors.name = 'Name is required.';
    if (!userDetails.email) errors.email = 'Email is required.';
    if (!/^\S+@\S+\.\S+$/.test(userDetails.email))
      errors.email = 'Enter a valid email.';
    if (!userDetails.phone) errors.phone = 'Phone number is required.';
    if (!userDetails.address) errors.address = 'Address is required.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const orderDetails = {
      cartItems: cart,
      totalPrice: getTotalPrice(),
      userDetails,
    };

    setIsLoading(true);
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
        clearCart(); // Clear cart after placing the order
        setUserDetails({
          name: '',
          email: '',
          phone: '',
          address: '',
        });
        setShowOrderForm(false);
      } else {
        const errorData = await response.json();
        toast.error('Failed to place order: ' + errorData.message || 'Unknown error.');
      }
    } catch (error) {
      console.error('Network Error:', error.message);
      toast.error('Network error occurred while placing order.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Cart Button */}
      <div
        onClick={handleShow}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-600"
      >
        <FaShoppingCart size={30} />
      </div>

      {/* Cart Modal */}
      <Modal show={showCart} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((product) => (
                <div key={product.id} className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5>{product.name}</h5>
                    <p>{product.description}</p>
                    <p>₹{product.price} x {product.quantity}</p>
                  </div>
                  <Button variant="danger" onClick={() => removeFromCart(product.id)}>
                    Remove
                  </Button>
                </div>
              ))}
              <div className="d-flex justify-content-between align-items-center">
                <h5>Total: ₹{getTotalPrice()}</h5>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOrderNow} disabled={cart.length === 0}>
            Buy Now
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Order Form Modal */}
      {showOrderForm && (
        <Modal show={showOrderForm} onHide={() => setShowOrderForm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Enter Your Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmitOrder}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                  id="name"
                  name="name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                />
                {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                  type="tel"
                  className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`}
                  id="phone"
                  name="phone"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                />
                {formErrors.phone && <div className="invalid-feedback">{formErrors.phone}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  className={`form-control ${formErrors.address ? 'is-invalid' : ''}`}
                  id="address"
                  name="address"
                  value={userDetails.address}
                  onChange={handleInputChange}
                />
                {formErrors.address && <div className="invalid-feedback">{formErrors.address}</div>}
              </div>
              <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                {isLoading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </Modal.Body>
        </Modal>
      )}

      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
    </>
  );
};

export default Cart;
