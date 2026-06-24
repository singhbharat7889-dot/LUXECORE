import { Container, Row, Col, Table, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemFromApi, updateCartQty } from "../Slice/CartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCart } from "../Slice/CartSlice";


function Cart() {
  const { cart } = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const navigate = useNavigate();



 const handleCheckout = async () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    navigate("/UserLogin");
    return;
  }

  try {
    await axios.post(
      "http://localhost:5500/api/orders",
      {
        userId: user._id,
      }
    );

    dispatch(clearCart());

    navigate("/UserProfile");
  } catch (error) {
  console.error(
    "Checkout Error:",
    error.response?.data || error.message
  );
}
};


  const subTotal = cart.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0,
  );
  
  const discountPrice = 5;
  const total = subTotal - discountPrice;

  if (!cart.length)
    return (
      <Container className="py-5 text-center">
        <h3 className="fw-bold">Your cart is empty 🛒</h3>
      </Container>
    );

  return (
    <Container className="py-5">
      <Row className="g-4">
        {/* LEFT - CART ITEMS */}
        <Col lg={8}>
          <Card className="shadow-sm border-0 rounded-4 p-3">
            <h5 className="mb-3 fw-bold">Shopping Cart</h5>

            <Table responsive className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>

              <tbody>
                {cart.map((item) => (
                  <tr key={item._id}>
                    {/* Product */}
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        {/* Remove Button */}
                        <button
                          className="btn btn-sm btn-outline-danger rounded-circle"
                          onClick={() => dispatch(deleteItemFromApi(item._id))}
                        >
                          ✕
                        </button>
                        <div
                          className="bg-white border rounded d-flex align-items-center justify-content-center overflow-hidden shadow-sm"
                          style={{
                            width: "80px",
                            height: "80px",
                            minWidth: "80px",
                          }}
                        >
                          <img
                            src={item.productId.image}
                            alt={item.productId.name}
                            className="img-fluid"
                            style={{
                              maxHeight: "100%",
                              maxWidth: "100%",
                              objectFit: "contain",
                              padding: "5px",
                            }}
                          />
                        </div>
                        <span className="fw-semibold">
                          {item.productId.title || item.productId.name}
                        </span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="fw-medium">${item.productId.price}</td>

                    {/* Quantity */}
                    <td>
                      <div className="d-flex justify-content-center">
                        <div className="input-group" style={{ width: "120px" }}>
                          <Button
                            variant="outline-secondary"
                            onClick={() =>
                              dispatch(
                                updateCartQty({
                                  id: item._id,
                                  quantity: item.quantity - 1,
                                }),
                              )
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </Button>

                          <input
                            type="text"
                            className="form-control text-center"
                            value={item.quantity}
                            readOnly
                          />

                          <Button
                            variant="outline-secondary"
                            onClick={() =>
                              dispatch(
                                updateCartQty({
                                  id: item._id,
                                  quantity: item.quantity + 1,
                                }),
                              )
                            }
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </td>

                    {/* Total */}
                    <td className="text-end fw-bold">
                      ${item.productId.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>

        {/* RIGHT - SUMMARY */}
        <Col lg={4}>
          <Card className="shadow-sm border-0 rounded-4 p-4">
            <h5 className="fw-bold mb-4">Order Summary</h5>

            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>${subTotal}</span>
            </div>

            <div className="d-flex justify-content-between mb-3 text-success">
              <span>Discount</span>
              <span>- ${discountPrice}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between fw-bold mb-4">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <Button
              className="w-100 rounded-pill fw-bold"
              size="lg"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
