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
   <nav className="navbar bg-white border-bottom sticky-top shadow-sm">
  <div className="container-fluid px-4">

    {/* Desktop Layout */}
    <div className="d-none d-md-flex align-items-center justify-content-between position-relative w-100" style={{ height: "70px" }}>

      <div
        className="fw-semibold fs-5"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/AdminDashboard")}
      >
        Admin Dashboard
      </div>

      <div
        className="position-absolute start-50 translate-middle-x fw-bold fs-3"
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
    <div className="d-flex d-md-none flex-column align-items-center py-2">

      <div
        className="fw-bold fs-3 mb-3"
        style={{ cursor: "pointer", userSelect: "none" }}
        onClick={() => navigate("/AdminDashboard")}
      >
        Luxe<span style={{ color: "#0084b4" }}>Core</span>
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-2">
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/AdminDashboard")}
        >
          <FaHome />
        </button>

        <button
          className="btn btn-outline-dark"
          onClick={() => navigate("/ProductForm")}
        >
          <FaBox />
        </button>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
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