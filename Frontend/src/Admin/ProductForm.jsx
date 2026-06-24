import axios from "axios";
import { useState } from "react";
import "../Pages/Css/AddProduct.css"
import { Link } from "react-router-dom";

function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [images, setImages] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    try {
      await axios.post(
        "http://localhost:5500/api/products",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Product Added Successfully");

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
      });

      setImages([]);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="product-page">
      <div className="container py-5">
        <div className="product-card">
          <div className="product-header">
            <div className="d-flex justify-content-between align-items-center mb-4">
  <h2>Add New Product</h2>

  <Link
    to="/Product"
    className="btn btn-dark"
  >
    View Products
  </Link>
</div>
            <p>Create and manage products for your store</p>
          </div>



          <form onSubmit={submitHandler} className="p-4">
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control custom-input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Category
                </label>
                <select
                  className="form-select custom-input"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">
                    Select Category
                  </option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Beauty</option>
                  <option>Home & Kitchen</option>
                  <option>Health & Fitness</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  className="form-control custom-input"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Stock
                </label>
                <input
                  type="number"
                  className="form-control custom-input"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stock: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  Description
                </label>
                <textarea
                  rows="5"
                  className="form-control custom-input"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-12">
                <label className="form-label">
                  Product Images
                </label>

                <input
                  type="file"
                  multiple
                  className="form-control custom-input"
                  onChange={(e) =>
                    setImages(e.target.files)
                  }
                />
              </div>

              {images.length > 0 && (
                <div className="col-12">
                  <div className="image-preview">
                    {[...images].map((img, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(img)}
                        alt=""
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary submit-btn"
                >
                  Add Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;