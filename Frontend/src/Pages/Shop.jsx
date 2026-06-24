import "../Pages/Css/Home.css";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCartQty } from "../Slice/CartSlice";
import { increaseQty, decreaseQty } from "../Slice/ProductSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Shop() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { productItems, status, quantities } = useSelector(
    (state) => state.product,
  );

  const { cart } = useSelector((state) => state.cartItems);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  const handleIncrease = (id) => {
    dispatch(increaseQty(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQty(id));
  };

  const handleAddToCart = (item) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/UserLogin");
      return;
    }

    const selectedQty = quantities[item._id] || 1;

    const cartItem = cart.find(
      (cartProduct) => cartProduct.productId._id === item._id,
    );

    if (cartItem) {
      dispatch(
        updateCartQty({
          id: cartItem._id,
          quantity: cartItem.quantity + selectedQty,
        }),
      );
    } else {
      dispatch(
        addToCart({
          _id: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: selectedQty,
        }),
      );
    }
  };

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = productItems.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(productItems.length / productsPerPage);

  return (



    
    <Container>
        {/* Page Header */}
  <div className="shop-header text-center py-5">
    <h1 className="shop-title" style={{ color: "#0084b4" }}>Our Collection</h1>
    <p className="shop-subtitle">
      Discover premium products crafted for quality, style, and everyday use.
    </p>
  </div>
      <Row className="g-4">
        {currentProducts.map((item) => {
          const cartItem = cart.find(
            (cartProduct) => cartProduct.productId._id === item._id,
          );

          const quantity = quantities[item._id] || 1;

          return (
            <Col xs={6} md={3} key={item._id}>
              <div className="product-card">
                {/* Image */}

                <div className="product-img-wrapper">
                  <img src={item.image} alt={item.name} className="img-fluid" />

                  {/* Overlay */}

                  <div className="product-overlay">
                    <button
                      className="btn btn-light rounded-pill px-3 fw-bold shadow-sm"
                      onClick={() => navigate(`/ProductPage/${item._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* Info */}

                <div className="product-info mt-3 text-center">
                  <p className="product-name fw-semibold mb-1">{item.name}</p>

                  <p className="product-price text-primary fw-bold">
                    $ {item.price}
                  </p>

                  {/* Quantity Stepper */}

                  <div className="mt-auto">
                    <div className="d-flex justify-content-center mb-3">
                      <div className="input-group quantity-stepper">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => handleDecrease(item._id)}
                          disabled={quantity === 1}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="form-control text-center bg-white"
                          value={quantity}
                          readOnly
                        />

                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => handleIncrease(item._id)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Add to Cart */}

                    <button
                      className="btn btn-primary w-100 rounded-pill fw-bold btn-add-cart"
                      onClick={() => handleAddToCart(item)}
                    >
                      {cartItem
                        ? `In Cart (${cartItem.quantity})`
                        : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <Row className="mt-4">
        <Col className="text-center">
          <button
            className="btn btn-outline-primary me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn mx-1 ${
                currentPage === index + 1
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="btn btn-outline-primary ms-2"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default Shop;
