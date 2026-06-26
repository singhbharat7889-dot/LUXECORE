import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Spinner,
} from "react-bootstrap";

import {
  addToCart,
  updateCartQty,
} from "../Slice/CartSlice";

import {
  increaseQty,
  decreaseQty,
  fetchData,
} from "../Slice/ProductSlice";

function ProductPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    productItems,
    quantities,
    status,
  } = useSelector((state) => state.product);

  const { cart } = useSelector(
    (state) => state.cartItems
  );

  // Fetch products if page is refreshed
  useEffect(() => {
    if (productItems.length === 0) {
      dispatch(fetchData());
    }
  }, [dispatch, productItems.length]);

  const product = productItems.find(
    (item) => item._id === id
  );

  const quantity = quantities[id] || 1;

  if (status === "loading") {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">
          Loading Product Details...
        </p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>Product Not Found</h2>

        <Link to="/shop" className="btn btn-primary mt-3">
          Back to Shop
        </Link>
      </Container>
    );
  }

  const handleAddToCart = () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      navigate("/UserLogin", {
        state: {
          redirectTo: `/ProductPage/${id}`,
        },
      });

      return;
    }

    const cartItem = cart.find(
      (item) => item.productId?._id === product._id
    );

    if (cartItem) {
      dispatch(
        updateCartQty({
          id: cartItem._id,
          quantity: cartItem.quantity + quantity,
        })
      );
    } else {
      dispatch(
        addToCart({
          _id: product._id,
          quantity,
        })
      );
    }
  };

  return (
    <Container className="py-5">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>

        <span className="mx-2">/</span>

        <Link to="/shop">Shop</Link>

        <span className="mx-2">/</span>

        <span>{product.name}</span>
      </nav>

      <Row className="g-5">
        <Col lg={7}>
          <div
            className="bg-white p-4 rounded-4 shadow-sm border d-flex align-items-center justify-content-center"
            style={{
              minHeight: "500px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid"
              style={{
                maxHeight: "450px",
                objectFit: "contain",
              }}
            />
          </div>
        </Col>

        <Col lg={5}>
          <Badge
            bg="dark"
            className="mb-3 px-3 py-2 text-uppercase"
          >
            {product.category}
          </Badge>

          <h1 className="fw-bold display-6 mb-3">
            {product.name}
          </h1>

          <h2 className="text-primary fw-bold mb-4">
            ${product.price}
          </h2>

          <p className="text-secondary mb-5">
            {product.description}
          </p>

          <div className="p-4 border rounded-4 bg-light">
            <label className="small fw-bold text-uppercase mb-3 d-block">
              Quantity
            </label>

            <div className="d-flex gap-3">
              <div className="d-flex align-items-center border bg-white rounded-3 shadow-sm">
                <Button
                  variant="link"
                  className="text-dark text-decoration-none"
                  disabled={quantity <= 1}
                  onClick={() =>
                    dispatch(decreaseQty(product._id))
                  }
                >
                  −
                </Button>

                <span
                  className="fw-bold"
                  style={{
                    minWidth: "40px",
                    textAlign: "center",
                  }}
                >
                  {quantity}
                </span>

                <Button
                  variant="link"
                  className="text-dark text-decoration-none"
                  onClick={() =>
                    dispatch(increaseQty(product._id))
                  }
                >
                  +
                </Button>
              </div>

              <Button
                className="flex-grow-1"
                onClick={handleAddToCart}
              >
                Add To Cart
              </Button>
            </div>
          </div>

          <div className="mt-4 d-flex gap-4">
            <small>✓ Secure Checkout</small>

            <small>✓ 7-Day Easy Returns</small>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductPage;