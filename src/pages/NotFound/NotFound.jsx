import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notFoundSection">
      <div className="notFoundCard">

        <h1 className="errorNumber">404</h1>

        <h2 className="errorTitle">
          Oops! Page Not Found
        </h2>

        <p className="errorDescription">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link to="/">
          <button className="homeButton">
            Go to Home
          </button>
        </Link>

      </div>
    </div>
  );
};

export default NotFound;