import { useState } from "react";
import { API_URL } from "../../../data/ApiPath";
import "./AddProduct.css";

const AddProduct = () => {

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState(false);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  // Category Checkbox
  const handleCategoryChange = (e) => {
    const value = e.target.value;

    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      setCategory([...category, value]);
    }
  };

  // Image Upload
  const handleImageUpload = (e) => {
    setFile(e.target.files[0]);
  };

  // Submit Product
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginToken =
        localStorage.getItem("token") ||
        localStorage.getItem("loginToken");

      if (!loginToken) {
        alert("Please Login First");
        return;
      }

      const firmId = localStorage.getItem("firmId");

      if (!firmId || firmId === "undefined" || firmId === "null") {
        alert("Firm ID not found. Please add a firm first.");
        return;
      }

      setLoading(true);

      const formData = new FormData();

      formData.append("productName", productName);
      formData.append("price", price);

      category.forEach((item) => {
        formData.append("category", item);
      });

      formData.append("bestSeller", bestSeller);
      formData.append("description", description);

      if (file) {
        formData.append("image", file);
      }

      const response = await fetch(
        `${API_URL}/product/add-product/${firmId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
          body: formData,
        }
      );

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = { message: "Server error or invalid response." };
      }

      if (response.ok && data.success !== false) {
        alert(data.message || "Product Added Successfully");

        setProductName("");
        setPrice("");
        setCategory([]);
        setBestSeller(false);
        setDescription("");
        setFile(null);

        const imgInput = document.getElementById("productImage");
        if (imgInput) {
          imgInput.value = "";
        }
      } else if (response.status === 401) {
        alert("Session expired or invalid token. Please log in again.");
      } else {
        alert(data.message || "Failed To Add Product");
      }
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong while adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-center">
      <div className="form-card addProductCard">

        <h2 className="formTitle">Add New Product</h2>

        <form className="productForm" onSubmit={handleProductSubmit}>

          <div className="formGroup">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Enter Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label>Price</label>
            <input
              type="number"
              placeholder="Enter Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label>Category</label>

            <div className="checkboxGroup">
              <label>
                <input
                  type="checkbox"
                  name="category"
                  value="veg"
                  checked={category.includes("veg")}
                  onChange={handleCategoryChange}
                />
                Veg
              </label>

              <label>
                <input
                  type="checkbox"
                  name="category"
                  value="non-veg"
                  checked={category.includes("non-veg")}
                  onChange={handleCategoryChange}
                />
                Non-Veg
              </label>
            </div>
          </div>

          <div className="formGroup">
            <label>Best Seller</label>

            <div className="radioGroup">

              <label>
                <input
                  type="radio"
                  name="bestSeller"
                  value="Yes"
                  checked={bestSeller === "Yes"}
                  onChange={(e) => setBestSeller(e.target.value)}
                />
                Yes
              </label>

              <label>
                <input
                  type="radio"
                  name="bestSeller"
                  value="No"
                  checked={bestSeller === "No"}
                  onChange={(e) => setBestSeller(e.target.value)}
                />
                No
              </label>

            </div>
          </div>

          <div className="formGroup">
            <label>Description</label>
            <textarea
              rows="4"
              placeholder="Enter Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="formGroup">
            <label>Product Image</label>
            <input
              type="file"
              id="productImage"
              onChange={handleImageUpload}
            />
          </div>

          <button className="submitBtn" type="submit" disabled={loading}>
            {loading ? "Adding Product..." : "Add Product"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default AddProduct;