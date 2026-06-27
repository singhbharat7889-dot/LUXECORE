import { Col, Container, Row } from "react-bootstrap";
import { FaRegHeart, FaShieldHeart, FaHeadset } from "react-icons/fa6";
import { IoBagCheckSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Css/Home.css"; // Reuses your home text structures
import "./Css/About.css"; // For page-specific layouts

function About() {
  const navigate = useNavigate();

  return (
    <>
      {/* MINIMALIST HEADER LAYOUT */}
      <Container className="pt-5 mt-3 text-center">
        <h1 className="display-4 fw-bold mb-3">ABOUT US</h1>
        <div className="divider mx-auto mb-5"></div>
      </Container>

      {/* MISSION & VISION SECTION */}
      <Container className="py-4">
        <Row className="align-items-center g-5">
          <Col md={6}>
            <h6 className="text-secondary text-uppercase fw-bold">Who We Are</h6>
            <h2 className="display-6 fw-bold mb-4">Redefining Modern Elegance</h2>
            <div className="divider mb-4" style={{ margin: "0" }}></div>
            <p className="lead text-muted mb-4">
              Founded with a passion for quality and design, LuxeCore serves as a curated haven for modern apparel, electronics, and lifestyle essentials.
            </p>
            <p className="text-secondary">
              We believe everyday products should be more than just functional—they should be an extension of your lifestyle, taste, and personal expression. Our teams work around the clock to source premium materials and top-tier items that elevate your daily routine.
            </p>
          </Col>
          <Col md={6}>
            <img
              src="https://images.unsplash.com/photo-1481437156560-3205f6a55735?q=80&w=895&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Our Workspace"
              className="img-fluid rounded-4 shadow-sm"
            />
          </Col>
        </Row>
      </Container>

      {/* BRAND VALUES / CORE STRENGTHS */}
      <div className="bg-light py-5 my-5">
        <Container>
          <div className="text-center mb-5">
            <h6 className="text-secondary text-uppercase fw-bold">Why Choose Us</h6>
            <h2 className="fw-bold">Our Core Commitments</h2>
            <div className="divider mx-auto"></div>
          </div>

          <Row className="g-4 text-center">
            <Col xs={12} md={4}>
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 border-0">
                <FaShieldHeart className="text-primary mb-3" size={40} />
                <h5 className="fw-bold mb-3">Premium Quality</h5>
                <p className="text-muted small mb-0">
                  Every product passes through exhaustive checkmarks to guarantee absolute premium standards before arriving at your door.
                </p>
              </div>
            </Col>

            <Col xs={12} md={4}>
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 border-0">
    <IoBagCheckSharp className="text-primary mb-3" size={40} />
                <h5 className="fw-bold mb-3">Global Shipping</h5>
                <p className="text-muted small mb-0">
                  Enjoy reliable, prompt, and traceable packaging fulfillment directly across borders with secure tracking setups.
                </p>
              </div>
            </Col>

            <Col xs={12} md={4}>
              <div className="p-4 bg-white rounded-4 shadow-sm h-100 border-0">
                <FaHeadset className="text-primary mb-3" size={40} />
                <h5 className="fw-bold mb-3">24/7 Support</h5>
                <p className="text-muted small mb-0">
                  Our dedicated client concierge team stays responsive at all hours to assist you with order steps or product details.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* CALL TO ACTION */}
      <Container className="py-5 text-center mb-5">
        <div className="p-5 rounded-4 text-white bg-dark shadow-lg">
          <FaRegHeart className="mb-3 text-danger animate-pulse" size={40} />
          <h3 className="fw-bold mb-3">Ready to Upgrade Your Lifestyle?</h3>
          <p className="mx-auto mb-4 text-white-50" style={{ maxWidth: "600px" }}>
            Explore our curated collections of clothing, watches, and smart gear carefully selected just for you.
          </p>
          <button
            className="btn btn-light rounded-pill px-4 py-2 fw-bold"
            onClick={() => navigate("/FashionApparel")}
          >
            Start Shopping
          </button>
        </div>
      </Container>
    </>
  );
}

export default About;
