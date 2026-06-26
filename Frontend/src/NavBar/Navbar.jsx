import { useState } from "react";
import { FaBars, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../NavBar/logo.css";

const CATEGORIES = [
  "Electronics & Gadgets",
  "Fashion & Apparel",
  "Beauty & Personal Care",
  "Home & Kitchen",
  "Health & Fitness",
];

function Navbar() {
  const navigate = useNavigate();

  const { cart } = useSelector((store) => store.cartItems);

  const totalQuantity = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleCategoryClick = (category) => {
    const routePath = category.replace(/[\s&]+/g, "");

    navigate(`/${routePath}`);

    setCategoryOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Top Banner */}
      <div
        className="text-white text-center py-1 small"
        style={{ backgroundColor: "#0084b4" }}
      >
        Free Delivery On Order Above $500 – Limited Time!
      </div>

      <nav className="navbar bg-white border-bottom sticky-top w-100 z-3">
        <div
          className="container-fluid d-flex align-items-center justify-content-between position-relative"
          style={{ maxWidth: "1000px" }}
        >
          {/* Left Section */}
          <div className="d-flex align-items-center">
            {/* Mobile Menu Button */}
            <div
              className="mobile-menu cp"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaBars size={22} />
            </div>

            {/* Desktop Navigation */}
            <div className="desktop-nav">
              <ul className="navbar-nav flex-row gap-3">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/shop" className="nav-link">
                    Shop
                  </NavLink>
                </li>

                {/* Category Dropdown */}
                <li
                  className="nav-item position-relative"
                  onMouseEnter={() => setCategoryOpen(true)}
                  onMouseLeave={() => setCategoryOpen(false)}
                >
                  <span className="nav-link cp">
                    Category
                  </span>

                  {categoryOpen && (
                    <ul
                      className="dropdown-menu show"
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        minWidth: "220px",
                      }}
                    >
                      {CATEGORIES.map((cat) => (
                        <li key={cat}>
                          <button
                            className="dropdown-item"
                            onClick={() => handleCategoryClick(cat)}
                          >
                            {cat}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          </div>

          {/* Center Logo */}
          <div
            className="navbar-brand fw-bold fs-3 logo-center m-0 cp"
            onClick={() => navigate("/")}
          >
            Luxe
            <span style={{ color: "#0084b4" }}>
              Core
            </span>
          </div>

          {/* Right Section */}
          <div className="d-flex align-items-center gap-3">
            <div
              className="position-relative cp"
              onClick={() =>
                navigate(user ? "/UserProfile" : "/UserLogin")
              }
            >
              <FaUser size={22} />
            </div>

            <div
              className="position-relative cp"
              onClick={() => navigate("/Cart")}
            >
              <FaCartShopping size={22} />

              {totalQuantity > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.6rem" }}
                >
                  {totalQuantity}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-dropdown bg-white border-top">
            <NavLink
              to="/"
              className="dropdown-item"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              className="dropdown-item"
              onClick={() => setMenuOpen(false)}
            >
              Shop
            </NavLink>

            <div className="dropdown-divider"></div>

            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className="dropdown-item"
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;