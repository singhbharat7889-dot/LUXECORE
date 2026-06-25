import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";
import { clearCart } from "../Slice/CartSlice";
import { useDispatch } from "react-redux";

import axios from "axios";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    dispatch(clearCart());

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
  };

  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `https://luxecore-api.onrender.com/api/orders/${user._id}`,
        );

        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [user?._id]);

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-success";

      case "Shipped":
        return "bg-info";

      case "Cancelled":
        return "bg-danger";

      case "Processing":
        return "bg-warning text-dark";

      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "1000px" }}>
      <div className="row g-4">
        {/* Profile Card */}
        <div className="col-lg-4">
          <div className="card border-0 shadow rounded-4">
            <div className="card-body text-center p-4">
              <div
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{
                  width: "100px",
                  height: "100px",
                  fontSize: "40px",
                  fontWeight: "bold",
                }}
              >
                {user.username?.charAt(0).toUpperCase()}
              </div>

              <h4>{user.username}</h4>

              <p className="text-muted mb-1">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="col-lg-8">
          <div className="card border-0 shadow rounded-4 mb-4">
            <div className="card-body p-4">
              <h4 className="mb-4">Personal Information</h4>

              <div className="mb-3 d-flex align-items-center">
                <FaUser className="me-3 text-primary" />
                <div>
                  <small className="text-muted">Username</small>
                  <h6>{user.username}</h6>
                </div>
              </div>

              <div className="mb-3 d-flex align-items-center">
                <FaEnvelope className="me-3 text-primary" />
                <div>
                  <small className="text-muted">Email</small>
                  <h6>{user.email}</h6>
                </div>
              </div>

              {/* <div className="d-flex align-items-center">
                <FaMapMarkerAlt className="me-3 text-primary" />
                <div>
                  <small className="text-muted">Address</small>
                  <h6>Add Address Feature Later</h6>
                </div>
              </div> */}
            </div>
          </div>

          {/* Orders */}
          <div className="card border-0 shadow rounded-4">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-4">
                <FaBoxOpen className="me-2 text-primary" size={20} />
                <h4 className="mb-0">My Orders</h4>
              </div>

              {orders.map((order) => (
                <div key={order._id} className="border rounded-3 p-3 mb-3">
                  <h6>Order #{order.orderNumber}</h6>

                  <p>Total: ${order.totalAmount}</p>

                  <span
                    className={`badge me-3 ${getStatusClass(order.status)}`}
                  >
                    {order.status}
                  </span>

                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() =>
                      setExpandedOrder(
                        expandedOrder === order._id ? null : order._id,
                      )
                    }
                  >
                    {expandedOrder === order._id
                      ? "Hide Details"
                      : "View Details"}
                  </button>

                  {expandedOrder === order._id && (
                    <div className="mt-3">
                      <h6 className="mb-3">Purchased Products</h6>

                      {order.items.map((item) => (
                        <div
                          key={item._id}
                          className="d-flex align-items-center border rounded p-2 mb-2"
                        >
                          <img
                            src={item.productId.image}
                            alt={item.productId.name}
                            width="70"
                            height="70"
                            className="rounded me-3"
                            style={{ objectFit: "cover" }}
                          />

                          <div className="flex-grow-1">
                            <h6 className="mb-1">{item.productId.name}</h6>

                            <small>Quantity: {item.quantity}</small>
                          </div>

                          <div>${item.productId.price}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Logout */}
          <div className="mt-4">
            <button className="btn btn-danger px-4 py-2" onClick={handleLogout}>
              <FaSignOutAlt className="me-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
