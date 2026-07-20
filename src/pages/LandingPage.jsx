import { useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import SideBar from "../components/SideBar/SideBar";
import Login from "../components/forms/Login/Login";
import "./LandingPage.css";
import Register from "../components/forms/Register/Register";
import AddFirm from "../components/forms/AddFirm/AddFirm";
import AddProduct from "../components/forms/AddProduct/AddProduct";
import Welcome from "../components/welcome/Welcome";
import AllProducts from "../components/forms/AllProducts/AllProducts";
import { API_URL } from "../data/ApiPath";
import UserDetails from "../components/forms/UserDetails/UserDetails";



const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAddFirm, setShowAddFirm] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);

  const [showLogout, setShowLogout] = useState(false);

  const [firmName, setFirmName] = useState("");

  const [showFirmTitle, setShowFirmTitle] = useState(true);

  const syncFirmName = async () => {
    const savedFirmName = localStorage.getItem("firmName");

    if (savedFirmName) {
      setFirmName(savedFirmName);
      setShowFirmTitle(false);
      return;
    }

    const token = localStorage.getItem("token");
    const firmId = localStorage.getItem("firmId");

    if (!token || !firmId) {
      setFirmName("");
      setShowFirmTitle(true);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/firm/${firmId}`);
      const data = await response.json();

      if (response.ok && data.firmName) {
        localStorage.setItem("firmName", data.firmName);
        setFirmName(data.firmName);
        setShowFirmTitle(false);
      } else {
        setFirmName("");
        setShowFirmTitle(true);
      }
    } catch (error) {
      console.log(error);
      setFirmName("");
      setShowFirmTitle(true);
    }
  };

  useEffect(() => {
  setShowLogin(true);
}, []);

  // useEffect(() => {
  //   syncFirmName();
  // }, []);

  // const logoutHandler = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("firmId");
  //   localStorage.removeItem("firmName");

  //   setShowLogout(false);
  //   setFirmName("");
  //   setShowFirmTitle(true);

  //   setShowLogin(false);
  //   setShowRegister(false);
  //   setShowAddFirm(false);
  //   setShowAddProduct(false);
  //   setShowWelcome(false);
  //   setShowAllProducts(false);

  //   alert("Logout Successfully");

  //   window.location.reload();
  // };







  const logoutHandler = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("firmId");
  localStorage.removeItem("firmName");

  setShowLogout(false);
  setFirmName("");
  setShowFirmTitle(true);

  setShowLogin(true);
  setShowRegister(false);
  setShowAddFirm(false);
  setShowAddProduct(false);
  setShowWelcome(false);
  setShowAllProducts(false);
  setShowUserDetails(false);

  alert("Logout Successfully");
};

  const showLoginHandeler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setShowUserDetails(false);
  };

  const showRegisterHandeler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setShowUserDetails(false);
  };

  const showAddFirmHandeler = () => {
    if (showLogout) {
      setShowLogin(false);
      setShowRegister(false);
      setShowAddFirm(true);
      setShowAddProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
      setShowUserDetails(false);
    } else {
      alert("Please Login");
      setShowLogin(true);
    }
  };

  const showAddProductHandeler = () => {
    if (showLogout) {
      if (!firmName && !localStorage.getItem("firmId")) {
        alert("Please add a firm first");
        setShowAddFirm(true);
        setShowAddProduct(false);
        setShowWelcome(false);
        setShowAllProducts(false);
        setShowUserDetails(false);
        return;
      }
      setShowLogin(false);
      setShowRegister(false);
      setShowAddFirm(false);
      setShowAddProduct(true);
      setShowWelcome(false);
      setShowAllProducts(false);
      setShowUserDetails(false);
    } else {
      alert("Please Login");
      setShowLogin(true);
    }
  };

  const showWelcomeHandler = () => {
    setShowWelcome(true);
    setShowLogin(false);
    setShowRegister(false);
    setShowAddFirm(false);
    setShowAddProduct(false);
    setShowAllProducts(false);
    setShowUserDetails(false);
    setShowLogout(true);
  };

  const handleLoginSuccess = (name = "") => {
    setFirmName(name);
    setShowLogout(true);
    if (name) {
      setShowFirmTitle(false);
    } else {
      setShowFirmTitle(true);
    }
  };

  const handleFirmAdded = (addedFirmName) => {
    setFirmName(addedFirmName);
    setShowFirmTitle(false);
    setShowAddFirm(false);
    setShowAddProduct(true);
    setShowUserDetails(false);
  };

  const showAllProductsHandler = () => {
    if (showLogout) {
      if (!firmName && !localStorage.getItem("firmId")) {
        alert("Please add a firm first");
        setShowAddFirm(true);
        setShowAddProduct(false);
        setShowWelcome(false);
        setShowAllProducts(false);
        setShowUserDetails(false);
        return;
      }
      setShowLogin(false);
      setShowRegister(false);
      setShowAddFirm(false);
      setShowAddProduct(false);
      setShowWelcome(false);
      setShowAllProducts(true);
      setShowUserDetails(false);
    } else {
      alert("Please Login");
      setShowLogin(true);
    }
  };

  const showUserDetailsHandler = () => {
    if (showLogout) {
      setShowLogin(false);
      setShowRegister(false);
      setShowAddFirm(false);
      setShowAddProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
      setShowUserDetails(true);
    } else {
      alert("Please Login");
      setShowLogin(true);
    }
  };

  return (
    <>
      <section className="landingsection">
        <NavBar
          showLoginHandeler={showLoginHandeler}
          showRegisterHandeler={showRegisterHandeler}
          logoutHandler={logoutHandler}
          showLogout={showLogout}
          firmName={firmName}
        />

        <div className="collectionSection">
          <SideBar
            showAddFirmHandeler={showAddFirmHandeler}
            showAddProductHandeler={showAddProductHandeler}
            showAllProductsHandler={showAllProductsHandler}
            showFirmTitle={showFirmTitle}
            showUserDetailsHandler={showUserDetailsHandler}
          />

          <div className="contentPanel">
            {showLogin && (
              <Login
                showWelcomeHandler={showWelcomeHandler}
                onLoginSuccess={handleLoginSuccess}
              />
            )}

            {showRegister && (
              <Register showLoginHandeler={showLoginHandeler} />
            )}

            {showAddFirm && showLogout && (
              <AddFirm onFirmAdded={handleFirmAdded} />
            )}

            {showAddProduct && showLogout && <AddProduct />}

            {showWelcome && <Welcome />}

            {showAllProducts && showLogout && <AllProducts />}

            {showUserDetails && showLogout && <UserDetails />}
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;