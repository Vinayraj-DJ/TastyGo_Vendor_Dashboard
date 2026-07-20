import { API_URL } from "../../../data/ApiPath";
import "./AddFirm.css";
import { useState,useRef } from "react";


const AddFirm = ({ onFirmAdded }) => {

  
  // Store firm name
  const [firmName, setFirmName] = useState("");

  // Store area
  const [area, setArea] = useState("");

  // Store category values (veg, non-veg)
  const [category, setCategory] = useState([]);

  // Store region values
  const [region, setRegion] = useState([]);

  // Store offer
  const [offer, setOffer] = useState("");

  // Store uploaded image
  const [file, setFile] = useState(null);

  // Handle Category Checkbox
  const handleCategoryChange = (event) => {
    const value = event.target.value;

    // If already selected remove it
    if (category.includes(value)) {
      setCategory(category.filter((item) => item !== value));
    } else {
      // Otherwise add it
      setCategory([...category, value]);
    }
  };

  // Handle Region Checkbox
  const handleRegionChange = (event) => {
    const value = event.target.value;

    if (region.includes(value)) {
      setRegion(region.filter((item) => item !== value));
    } else {
      // Add region
      setRegion([...region, value]);
    }
  };

  // Submit Form
  const handleFirmSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get JWT Token from localStorage
      const loginToken = localStorage.getItem("token") || localStorage.getItem("loginToken");

      if (!loginToken) {
        alert("Please login first to add a firm.");
        return;
      }

      // Create FormData
      const formData = new FormData();

      // Append text fields
      formData.append("firmName", firmName);
      formData.append("area", area);
      formData.append("offer", offer);

      // Append category array
      category.forEach((item) => {
        formData.append("category", item);
      });

      // Append region array
      region.forEach((item) => {
        formData.append("region", item);
      });

      // Append image
      formData.append("image", file);

      // Send data to backend
      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
        body: formData,
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = { message: "Something went wrong while adding the firm." };
      }

      if (response.ok && data.success !== false) {
        console.log(data);
        const addedFirmName = firmName;
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null);

        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        const firmId = data.firmId;
        localStorage.setItem("firmId", firmId);
        localStorage.setItem("firmName", addedFirmName);
        alert(data.message || "Firm added successfully");

        if (onFirmAdded) {
          onFirmAdded(addedFirmName);
        }
      } else if (data.message === "vendor can have only one firm") {
        alert("firm exists,Only 1 firm can be added");
      } else {
        console.error("Add firm failed", data);
        alert(data.message || "Failed to add firm.");
      }
    } catch (error) {
      console.error("Failed to add firm", error);
    }
  };

  // Handle Image Upload
  const handelImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  };

  const fileInputRef = useRef(null);

  return (
    <div className="form-center">
      <div className="form-card addFirmCard">
        <h2 className="formTitle">Add New Firm</h2>

        <form className="firmForm" onSubmit={handleFirmSubmit}>
          <div className="formGroup">
            <label>Firm Name</label>
            <input
              type="text"
              placeholder="Enter Firm Name"
              name="firmName"
              value={firmName}
              onChange={(e) => setFirmName(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label>Area</label>
            <input
              type="text"
              placeholder="Enter Area"
              name="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
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
            <label>Region</label>

            <div className="checkboxGroup">
              <label>
                <input
                  type="checkbox"
                  name="region"
                  value="south-indian"
                  checked={region.includes("south-indian")}
                  onChange={handleRegionChange}
                />
                South Indian
              </label>

              <label>
                <input
                  type="checkbox"
                  name="region"
                  value="north-indian"
                  checked={region.includes("north-indian")}
                  onChange={handleRegionChange}
                />
                North Indian
              </label>

              <label>
                <input
                  type="checkbox"
                  name="region"
                  value="chinese"
                  checked={region.includes("chinese")}
                  onChange={handleRegionChange}
                />
                Chinese
              </label>

              <label>
                <input
                  type="checkbox"
                  name="region"
                  value="bakery"
                  checked={region.includes("bakery")}
                  onChange={handleRegionChange}
                />
                Bakery
              </label>
            </div>
          </div>

          <div className="formGroup">
            <label>Offer</label>
            <input
              type="text"
              placeholder="Ex: 20% OFF"
              name="offer"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label>Firm Image</label>
            <input type="file" ref={fileInputRef} onChange={handelImageUpload} required />
          </div>

          <button className="submitBtn" type="submit">
            Add Firm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFirm;