import React, { useState, useEffect } from "react";
import { API_URL } from "../../../data/ApiPath";
import "./AllProducts.css";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  // ===========================
  // Get All Products
  // ===========================
  const ProductsHandler = async () => {
    const firmId = localStorage.getItem("firmId");

    try {
      const response = await fetch(`${API_URL}/product/firm/${firmId}`);
      const data = await response.json();

      console.log("Products Response:", data);

      setProducts(data.products || []);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch products");
    }
  };

  // ===========================
  // Delete Product
  // ===========================
  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      // Get Token
      const token =
        localStorage.getItem("loginToken") ||
        localStorage.getItem("token");

      console.log("Token:", token);

      if (!token) {
        alert("Please Login Again");
        return;
      }

      const response = await fetch(
        `${API_URL}/product/delete-product/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        alert(data.message);

        setProducts((prevProducts) =>
          prevProducts.filter((item) => item._id !== productId)
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    ProductsHandler();
  }, []);

  return (
    <div className="productsContainer">
      <h2 className="productHeading">All Products</h2>

      {products.length === 0 ? (
        <p className="noProducts">No Products Added</p>
      ) : (
        <table className="productsTable">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>

                <td>₹{item.price}</td>

                <td>
                  {item.image ? (
                    <img
                      src={
                        item.image.startsWith("data:") ||
                        item.image.startsWith("http://") ||
                        item.image.startsWith("https://")
                          ? item.image
                          : `${API_URL}/uploads/${item.image}`
                      }
                      alt={item.productName}
                      className="productImage"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>

                <td>
                  <button
                    className="deleteBtn"
                    onClick={() => deleteProduct(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;