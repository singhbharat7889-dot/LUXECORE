import { FaBox, FaHome, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/UserLogin");
  };

  return (
    <nav className="navbar bg-white border-bottom sticky-top shadow-sm py-2">
      <div className="container-fluid d-flex flex-column flex-md-row align-items-center px-3 px-md-4">

        {/* Top Row */}
        <div className="w-100 d-flex justify-content-between align-items-center position-relative">

          {/* Left Side - Hide on Mobile */}
          <div
            className="fw-semibold fs-5 d-none d-md-block"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/AdminDashboard")}
          >
            Admin Dashboard
          </div>

          {/* Logo */}
          <div
            className="mx-auto fw-bold fs-3"
            style={{
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={() => navigate("/AdminDashboard")}
          >
            Luxe<span style={{ color: "#0084b4" }}>Core</span>
          </div>

          {/* Spacer for desktop alignment */}
          <div className="d-none d-md-block" style={{ width: "180px" }} />
        </div>

        {/* Buttons */}
        <div className="d-flex flex-wrap justify-content-center gap-2 mt-3 mt-md-0">
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/AdminDashboard")}
          >
            <FaHome className="me-2" />
            Dashboard
          </button>

          <button
            className="btn btn-outline-dark"
            onClick={() => navigate("/ProductForm")}
          >
            <FaBox className="me-2" />
            Products
          </button>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}

export default AdminNavbar;