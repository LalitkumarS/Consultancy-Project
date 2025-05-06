import React, { useState } from "react";

const initialStock = [
  { id: 1, name: "Basmati Rice", bought: 500, available: 500 },
  { id: 2, name: "Jasmine Rice", bought: 500, available: 500 },
  { id: 3, name: "Red Rice", bought: 500, available: 500 },
  { id: 4, name: "Mogra Rice", bought: 500, available: 500 },
  { id: 5, name: "Brown Rice", bought: 500, available: 500 },
  { id: 6, name: "Black Rice", bought: 500, available: 500 },
  { id: 7, name: "Sona Masuri Rice", bought: 500, available: 500 },
  { id: 8, name: "Ambemohar Rice", bought: 500, available: 500 },
];

const StockHistory = () => {
  const [stock, setStock] = useState(initialStock);

  const handlePurchase = (id) => {
    const quantity = parseInt(prompt("Enter quantity to buy (kg):"), 10);
    if (!isNaN(quantity) && quantity > 0) {
      setStock((prevStock) =>
        prevStock.map((item) =>
          item.id === id ? { ...item, available: Math.max(0, item.available - quantity) } : item
        )
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Stock History</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Type of Rice</th>
            <th>Quantity Bought (kg)</th>
            <th>Currently Available (kg)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.bought}</td>
              <td>{item.available}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handlePurchase(item.id)}
                  disabled={item.available === 0}
                >
                  Buy
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockHistory;
