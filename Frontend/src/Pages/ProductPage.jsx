import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Container, Row, Col, Button, Badge, Spinner } from "react-bootstrap";
import { addToCart } from "../Slice/CartSlice";
import { increaseQty, decreaseQty, fetchData } from "../Slice/ProductSlice";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  const navigate = useNavigate();
  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/UserLogin", {
        state: {
          redirectTo: `/ProductPage/${id}`,
        },
      });
      return;
    }

    dispatch(
      addToCart({
        ...product,
        quantity,
      }),
    );
  };

  const { id } = useParams();

  const dispatch = useDispatch();

  const { productItems, quantities, status } = useSelector(
    (state) => state.product,
  );

  useEffect(() => {
    if (productItems.length === 0 && status !== "loading") {
      dispatch(fetchData());
    }
  }, [dispatch, productItems.length, status]);

  const product = productItems.find((item) => item._id === id);

  const quantity = quantities[product?._id] || 1;

  if (status === "loading") {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />

        <p className="mt-3">Loading Product Details...</p>
      </Container>
    );
  }

  if (!product && status === "success") {
    return (
      <Container className="py-5 text-center">
        <h2 className="display-4 fw-bold text-muted">Product Not Found</h2>

        <Link to="/" className="btn btn-primary mt-3">
          Return to Shop
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <nav className="breadcrumb">
        <Link to="/">Home </Link>
        <span> / </span>

        <Link to="/Shop"> Shop </Link>
        <span> / </span>

        <span> {product.name} </span>
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
          <div className="ps-lg-4">
            <Badge bg="dark" className="mb-3 px-3 py-2 text-uppercase">
              {product.category || "Premium Collection"}
            </Badge>

            <h1 className="fw-bold display-6 mb-3">{product.name}</h1>

            <div className="d-flex align-items-center mb-4">
              <h2 className="text-primary fw-bold mb-0">$ {product.price}</h2>
            </div>

            <p className="text-secondary mb-5">{product.description}</p>

            <div className="p-4 border rounded-4 bg-light">
              <label className="small fw-bold text-uppercase mb-3 d-block">
                Select Quantity
              </label>

              <div className="d-flex gap-3">
                <div className="d-flex align-items-center border bg-white rounded-3 shadow-sm">
                  <Button
                    variant="link"
                    onClick={() => dispatch(decreaseQty(product._id))}
                    className="text-decoration-none fw-bold text-dark px-3"
                    disabled={quantity <= 1}
                  >
                    –
                  </Button>

                  <span
                    className="px-2 fw-bold"
                    style={{
                      minWidth: "30px",
                      textAlign: "center",
                    }}
                  >
                    {quantity}
                  </span>

                  <Button
                    variant="link"
                    onClick={() => dispatch(increaseQty(product._id))}
                    className="text-decoration-none fw-bold text-dark px-3"
                  >
                    +
                  </Button>
                </div>

                <Button
                  variant="primary"
                  className="flex-grow-1 py-3 fw-bold rounded-3 shadow-sm"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </Button>
              </div>
            </div>

            <div className="mt-4 pt-2 d-flex">
              <p className="small text-muted mb-1">✓ Secure Checkout</p>

              <p className="small text-muted px-5">✓ 7-Day Easy Returns</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductPage;
