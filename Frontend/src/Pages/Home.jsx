import { Carousel, Col, Container, Row } from "react-bootstrap";
import { FaRegHeart } from "react-icons/fa6";
import "./Css/Carousel.css";
import "./Css/Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { filterItems } from "../Slice/ProductSlice";

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetch("http://localhost:5500/api/products")
      .then((res) => res.json())

      .then((data) => {
        setProducts(data.products.slice(0, 8));
      })

      .catch((err) => console.log(err));
  }, []);

  const dispatch = useDispatch();

const handleCategoryClick = (category) => {
  dispatch(filterItems(category));

  const routePath = category.replace(/[\s&]+/g, "");
  navigate(`/${routePath}`);
};



  return (
    <>
    {/* HERO SECTION */}

<section className="hero-section position-relative">

  <img
    src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

    alt="Hero Banner"

    className="hero-image"
  />

  {/* Overlay */}

  <div className="hero-overlay"></div>

  {/* Content */}

  <div className="hero-content">

    <span className="hero-tag">
      NEW ARRIVALS
    </span>

    <h1>
      Premium Clothing Collection
    </h1>

    <p>
      Discover stylish everyday essentials crafted for comfort,
  confidence, and modern fashion.
    </p>

    <button className="btn btn-light rounded-pill px-4 py-2 fw-bold mt-3"onClick={() => navigate("/FashionApparel")} >
      Shop Collection
    </button>

  </div>

</section>

      {/* FEATURED CATEGORIES */}

      <div className="container py-5">
        <div className="text-center mb-5">
          <h6 className="text-secondary text-uppercase fw-bold">
            Handpicked Just for You
          </h6>

          <h2 className="display-5 fw-bold mb-3">FEATURED CATEGORIES</h2>

          <div className="divider"></div>

          <p className="lead mx-auto desc">
            Discover a curated selection of our best products across top
            categories.
          </p>
        </div>

        <Container fluid className="shop-container">
          <Row className="g-3">
            <Col xs={12} md={4}>
              <div className="card-box large"
            onClick={() => handleCategoryClick("Fashion & Apparel")}>
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=60"
                  alt="Fashion & Apparel"
                  
                />

                <div className="label">Fashion & Apparel</div>
              </div>
            </Col>

            <Col xs={12} md={4}>
              <Row className="g-3">
                <Col xs={6} md={12}>
                  <div className="card-box small"
                  onClick={() => handleCategoryClick("Beauty & Personal Care")}>
                    <img
                      src="https://plus.unsplash.com/premium_photo-1684407616442-8d5a1b7c978e?w=500&auto=format&fit=crop&q=60"
                      alt="Beauty & Personal Care"
                    />

                    <div className="label">Beauty & Personal Care</div>
                  </div>
                </Col>

                <Col xs={6} md={12}>
                  <div className="card-box small"
                  onClick={() => handleCategoryClick("Health & Fitness")}>
                    <img
                      src="https://images.unsplash.com/photo-1562259917-41ec5278bc46?w=500&auto=format&fit=crop&q=60"
                      alt="Health & Fitness"
                    />

                    <div className="label">Health & Fitness</div>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col xs={12} md={4}>
              <div className="card-box large"
              onClick={() => handleCategoryClick("Electronics & Gadgets")}>
                <img
                  src="https://images.unsplash.com/photo-1621985499238-698dfd45b017?w=500&auto=format&fit=crop&q=60"
                  alt="Electronics & Gadgets"
                />

                <div className="label">Electronics & Gadgets</div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* OFFER BAR */}

      <div className="offer-bar">
        <p>Flat 20% OFF on Women’s Watches – Limited Time!</p>
      </div>

      {/* FEATURED PRODUCTS */}

      <div className="container py-5">
        <div className="text-center mb-5">
          <h6 className="text-secondary text-uppercase fw-bold">Top Picks</h6>

          <h2 className="display-5 fw-bold mb-3 text-uppercase">
            FEATURED PRODUCTS
          </h2>

          <div className="divider"></div>

          <p className="lead text-muted mx-auto desc">
            Explore our best-selling items, handpicked for quality and style.
          </p>
        </div>

        <Container>
          <Row className="g-4">
            {products.map((item) => (
              <Col xs={6} md={3} key={item._id}>
                <div className="product-card h-100 d-flex flex-column">
                  <div className="product-img-wrapper">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid"
                    />

                    <div className="product-overlay">
                      <button
                        className="btn btn-light rounded-pill px-3 fw-bold shadow-sm"
                        onClick={() => navigate(`/ProductPage/${item._id}`)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="product-info mt-3 text-center p-2 flex-grow-1">
                    <p className="product-name fw-semibold mb-1">{item.name}</p>

                    <p className="product-price text-primary fw-bold mb-3">
                      $ {item.price}
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* About Section */}

      <div className="container py-5">
        <div className="about-section-wrapper">
          <div className="about-details">
            <FaRegHeart className="mb-3 text-danger" size={30} />

            <h4>About the shop</h4>

            <p>
              LuxeCore is a modern lifestyle store providing curated collections
              and premium essentials for everyday living.
            </p>

            <button className="btn btn-outline-dark rounded-pill px-4">
              Learn more
            </button>
          </div>

          <img
            className="aboutImage d-block w-100 rounded-4"
            src="https://images.unsplash.com/photo-1583922606661-0822ed0bd916?w=500&auto=format&fit=crop&q=60"
            alt="About our shop"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
