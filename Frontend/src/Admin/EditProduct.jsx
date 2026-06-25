import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

function EditProduct() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct =
    async () => {
      try {
        const res =
          await axios.get(
            `https://luxecore-api.onrender.com/api/products/${id}`
          );

        setProduct(
          res.data.product
        );
      } catch (err) {
        console.log(err);
      }
    };

  const handleChange = (
    e
  ) => {
    setProduct({
      ...product,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleImageChange = (
    e
  ) => {
    const file =
      e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(
        URL.createObjectURL(
          file
        )
      );
    }
  };

  const updateProduct =
    async (e) => {
      e.preventDefault();

      try {
        const formData =
          new FormData();

        formData.append(
          "name",
          product.name
        );

        formData.append(
          "description",
          product.description
        );

        formData.append(
          "price",
          product.price
        );

        formData.append(
          "category",
          product.category
        );

        formData.append(
          "stock",
          product.stock
        );

        if (image) {
          formData.append(
            "images",
            image
          );
        }

        await axios.put(
          `http://localhost:5500/api/products/${id}`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Product Updated Successfully"
        );

        navigate("/Product");
        
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className="container py-5">
     <div className="d-flex justify-content-between"> 
        <h2 className="mb-4">
        Edit Product
      </h2>
       <Link
          to="/Product"
          className="btn btn-dark
          d-inline-block" style={{ height: '50px', lineHeight: '38px' }}
        >
          View Products
        </Link>
        </div>

      <form
        onSubmit={
          updateProduct
        }
      >
        <div className="mb-3">
          <label>
            Product Name
          </label>

          <input
            type="text"
            name="name"
            className="form-control"
            value={
              product.name
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="mb-3">
          <label>
            Description
          </label>

          <textarea
            name="description"
            className="form-control"
            rows="4"
            value={
              product.description
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="mb-3">
          <label>
            Price
          </label>

          <input
            type="number"
            name="price"
            className="form-control"
            value={
              product.price
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="mb-3">
          <label>
            Category
          </label>

          <input
            type="text"
            name="category"
            className="form-control"
            value={
              product.category
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="mb-3">
          <label>
            Stock
          </label>

          <input
            type="number"
            name="stock"
            className="form-control"
            value={
              product.stock
            }
            onChange={
              handleChange
            }
          />
        </div>

        {/* Current Image */}

        <div className="mb-3">
          <label>
            Current Image
          </label>

          <br />

          {product.image && (
            <img
              src={
                product.image
              }
              alt="product"
              style={{
                width:
                  "200px",
                height:
                  "200px",
                objectFit:
                  "cover",
                borderRadius:
                  "10px",
              }}
            />
          )}
        </div>

        {/* Upload New Image */}

        <div className="mb-3">
          <label>
            Upload New
            Image
          </label>

          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={
              handleImageChange
            }
          />
        </div>

        {/* Preview */}

        {preview && (
          <div className="mb-3">
            <label>
              New Image
              Preview
            </label>

            <br />

            <img
              src={preview}
              alt="preview"
              style={{
                width:
                  "200px",
                height:
                  "200px",
                objectFit:
                  "cover",
                borderRadius:
                  "10px",
              }}
            />
          </div>
        )}

        <button
          type="submit"
          className="btn btn-success"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;