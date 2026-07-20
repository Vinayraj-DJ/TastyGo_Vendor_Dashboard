import React from "react";
import "./NavBar.css";

const NavBar = ({
  showLoginHandeler,
  showRegisterHandeler,
  logoutHandler,
  showLogout,
  firmName = "",
}) => {

  return (
    <header className="navsection">

      <div className="company">
        <h2>Vendor Dashboard</h2>
      </div>

      <div className="firmSection">
        <h3>
          Firmname : {showLogout ? firmName : ""}
        </h3>
      </div>

      <div className="userAuth">
        {!showLogout ? (
          <>
            <button
              className="authButton"
              onClick={showLoginHandeler}
            >
              Login
            </button>

            <button
              className="authButton authButtonPrimary"
              onClick={showRegisterHandeler}
            >
              Register
            </button>
          </>
        ) : (
          <button
            className="authButton logoutButton"
            onClick={logoutHandler}
          >
            Logout
          </button>
        )}
      </div>

    </header>
  );
};

export default NavBar;