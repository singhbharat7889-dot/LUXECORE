import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5500/api/products"
      );

      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5500/api/products/${id}`
      );

      // Remove deleted product from state
      setProducts(
        products.filter(
          (product) => product._id !== id
        )
      );

      alert("Product deleted successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between mb-4">
        <h2>All Products</h2>

        <Link
          to="/ProductForm"
          className="btn btn-primary d-inline-block"
          style={{ height: "50px", lineHeight: "38px" }}
        >
          Add Product
        </Link>
      </div>

      <div className="row">
        {products.map((product) => (
          <div
            key={product._id}
            className="col-lg-4 col-md-6 mb-4"
          >
            <div className="card shadow h-100">
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{
                  height: "250px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">
                <h5>{product.name}</h5>

                <p>${product.price}</p>

                <p>{product.category}</p>

                <p>Stock: {product.stock}</p>

                <div className="d-flex gap-2">
                  <Link
                    to={`/EditProduct/${product._id}`}
                    className="btn btn-warning"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      deleteProduct(product._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;