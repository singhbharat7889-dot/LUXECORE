import React from "react";
import { FaHome, FaBox, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function UserDashboard() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/orders/admin/all");

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `http://localhost:5500/api/orders/admin/status/${orderId}`,
        { status },
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background: "#f4f7fc",
      }}
    >
      {/* Main Content */}
      <div className="col-lg-12 p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold">
              Welcome Back {user.username?.toUpperCase()}
            </h2>

            <p className="text-muted">Manage your orders</p>
          </div>

          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
            style={{
              width: "60px",
              height: "60px",
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            {user.username?.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body">
                <h6>Total Orders</h6>
                <h2>{orders.length}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body">
                <h6>Total Earnings</h6>
                <h2>
                  $
                  {orders.reduce(
                    (total, order) => total + order.totalAmount,
                    0,
                  )}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body">
            <h4 className="mb-4">Recent Orders</h4>

            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Order No.</th>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Total Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Update Status</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.orderNumber}</td>

                      <td>{order.userId?.username}</td>

                      <td>
                        {order.items.map((item) => (
                          <div key={item._id}>
                            {item.productId?.name} × {item.quantity}
                          </div>
                        ))}
                      </td>

                      <td>${order.totalAmount}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`badge ${
                            order.status === "Delivered"
                              ? "bg-success"
                              : order.status === "Shipped"
                                ? "bg-info"
                                : order.status === "Cancelled"
                                  ? "bg-danger"
                                  : "bg-warning text-dark"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td>
                        <select
                          className="form-select"
                          value={order.status}
                          onChange={(e) =>
                            updateStatus(order._id, e.target.value)
                          }
                        >
                          <option value="Processing">Processing</option>

                          <option value="Shipped">Shipped</option>

                          <option value="Delivered">Delivered</option>

                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
