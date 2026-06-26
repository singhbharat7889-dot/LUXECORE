import "../Pages/Css/Home.css";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCartQty } from "../Slice/CartSlice";
import {
  increaseQty,
  decreaseQty,
} from "../Slice/ProductSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function BeautyPersonalCare() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


 const {
  productItems,
  quantities,
  status,
} = useSelector((state) => state.product);

  const { cart } = useSelector((state) => state.cartItems);

  const filteredProducts = productItems.filter(
    (item) => item.category === "Beauty & Personal Care"
  );

  if (status === "loading") {
    return (
      <Container className="text-center py-5">
        <h3>Loading products...</h3>
      </Container>
    );
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
      (cartProduct) => cartProduct.productId?._id === item._id
    );

    if (cartItem) {
      dispatch(
        updateCartQty({
          id: cartItem._id,
          quantity: cartItem.quantity + selectedQty,
        })
      );
    } else {
      dispatch(
        addToCart({
          _id: item._id,
          quantity: selectedQty,
        })
      );
    }
  };

  return (
    <Container>
      {/* Header */}
      <div className="category-banner">
        <div className="category-banner-content">
          <h1>Beauty & Personal Care</h1>
          <p>
            Discover premium skincare, wellness, and personal care essentials
            designed to help you look and feel your best every day.
          </p>
        </div>
      </div>

      <Row className="g-4">
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((item) => {
            const cartItem = cart.find(
              (cartProduct) => cartProduct.productId?._id === item._id
            );

            const quantity = quantities[item._id] || 1;

            return (
              <Col xs={6} md={3} key={item._id}>
                <div className="product-card">
                  <div className="product-img-wrapper">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid"
                    />

                    <div className="product-overlay">
                      <button
                        className="btn btn-light rounded-pill px-3 fw-bold shadow-sm"
                        onClick={() =>
                          navigate(`/ProductPage/${item._id}`)
                        }
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="product-info mt-3 text-center">
                    <p className="product-name fw-semibold mb-1">
                      {item.name}
                    </p>

                    <p className="product-price text-primary fw-bold">
                      ${item.price}
                    </p>

                    <div className="mt-auto">
                      <div className="d-flex justify-content-center mb-3">
                        <div className="input-group quantity-stepper">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() =>
                              handleDecrease(item._id)
                            }
                            disabled={quantity === 1}
                          >
                            -
                          </button>

                          <input
                            className="form-control text-center bg-white"
                            value={quantity}
                            readOnly
                          />

                          <button
                            className="btn btn-outline-secondary"
                            onClick={() =>
                              handleIncrease(item._id)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        className="btn btn-primary w-100 rounded-pill fw-bold btn-add-cart"
                        onClick={() =>
                          handleAddToCart(item)
                        }
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
          })
        ) : (
          <Col className="text-center py-5">
            <h4>No products found.</h4>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default BeautyPersonalCare;