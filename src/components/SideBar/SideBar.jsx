import React from "react";
import "./SideBar.css";

const SideBar = ({
  showAddFirmHandeler,
  showAddProductHandeler,
  showAllProductsHandler,
  showFirmTitle,
  showUserDetailsHandler,
}) => {
  return (
    <aside className="sidebarsection">
      <ul className="sidebarList">

        {showFirmTitle && (
          <li
            className="sidebarItem"
            onClick={showAddFirmHandeler}
          >
            Add Firm
          </li>
        )}

        <li
          className="sidebarItem"
          onClick={showAddProductHandeler}
        >
          Add Product
        </li>

        <li
          className="sidebarItem"
          onClick={showAllProductsHandler}
        >
          All Products
        </li>

        <li className="sidebarItem" onClick={showUserDetailsHandler}>
          User Details
        </li>

      </ul>
    </aside>
  );
};

export default SideBar;