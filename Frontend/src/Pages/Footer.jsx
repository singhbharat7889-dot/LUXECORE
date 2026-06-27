import { Col, Container, Row } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import "./Css/Footer.css";
import { Navigate } from "react-router-dom";



function Footer(){

  const navigate = useNavigate();
  return(<>
   <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <Container>
        <Row className="text-center text-md-start">
          {/* Company Info */}
          <Col md={3} lg={3} xl={3} className="mx-auto mt-3">
            <h5 className="text-uppercase mb-4 fw-bold text-primary">
LuxeCore
</h5>
            <p className="small ">
              Redefining elegance with curated collections of premium watches and lifestyle accessories for the modern individual.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={2} lg={2} xl={2} className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 fw-bold">Quick links</h6>
            <p><a  className=" text-decoration-none" >Electronics & Gadgets</a></p>
            <p><a  className=" text-decoration-none">Fashion & Apparel</a></p>
            <p><a  className=" text-decoration-none"
            onClick={() =>
                      Navigate("/BeautyPersonalCare")}
            >Beauty & Personal Care</a></p>
            <p><a  className=" text-decoration-none"  >Home & Kitchen</a></p>
            <p><a  className=" text-decoration-none">Health & Fitness</a></p>
          </Col>

          {/* Contact & Support */}
          <Col md={3} lg={2} xl={2} className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 fw-bold">Support</h6>
            <p><a className="text-decoration-none">Shipping Policy</a></p>
            <p><a className=" text-decoration-none">Returns</a></p>
            <p><a className=" text-decoration-none">Terms of Service</a></p>
            <p><a className=" text-decoration-none">Contact Us</a></p>
          </Col>

          {/* Newsletter */}
          <Col md={4} lg={3} xl={3} className="mx-auto mt-3">
            <h6 className="text-uppercase mb-4 fw-bold">Newsletter</h6>
            <p className="small ">Join our list for 20% off your first order!</p>
            <div className="input-group mb-3">
              <input type="text" className="form-control rounded-start-pill" placeholder="Email Address" />
              <button className="btn btn-primary rounded-end-pill px-3" type="button">Join</button>
            </div>
            
       
          </Col>
        </Row>

        <hr className="mb-4 mt-5 opacity-25" />

        <Row className="align-items-center">
          <Col md={7} lg={8}>
            <p className="small ">
              © 2026 Copyright: <strong>
LuxeCore
</strong>. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  
  
  
  </>)

}

export default Footer