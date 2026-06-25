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
      <div className="container-fluid px-3 px-md-4">

        {/* Desktop Layout */}
        {/* Added w-100 so justify-content-between can stretch items across the screen */}
        <div className="d-none d-md-flex w-100 justify-content-between align-items-center">
          <div
            className="fw-bold fs-3"
            style={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => navigate("/AdminDashboard")}
          >
            Luxe<span style={{ color: "#0084b4" }}>Core</span>
          </div>

          <div className="d-flex align-items-center gap-2">
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

        {/* Mobile Layout */}
        {/* Changed to row layout with w-100 and justify-content-between so logo stays left and actions go right */}
        <div className="d-flex d-md-none w-100 justify-content-between align-items-center">
          <div
            className="fw-bold fs-4"
            style={{ cursor: "pointer", userSelect: "none" }}
            onClick={() => navigate("/AdminDashboard")}
          >
            Luxe<span style={{ color: "#0084b4" }}>Core</span>
          </div>

          {/* Buttons stay grouped together on the right side */}
          <div className="d-flex gap-1">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => navigate("/AdminDashboard")}
              title="Dashboard"
            >
              <FaHome />
            </button>

            <button
              className="btn btn-sm btn-outline-dark"
              onClick={() => navigate("/ProductForm")}
              title="Products"
            >
              <FaBox />
            </button>

            <button
              className="btn btn-sm btn-danger"
              onClick={handleLogout}
              title="Logout"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
}

export default AdminNavbar;
