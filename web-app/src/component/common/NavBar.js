import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          McDonalds
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Admin */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to={"/view-admins"}
              >
                View All Admins
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/add-admins"}>
                Add New Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to={"/view-customers"}
              >
                View All Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/add-customers"}>
                Add New Customer
              </Link>
            </li>
          </ul>
        </div>

        {/* Product */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to={"/view-products"}
              >
                View All Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/add-products"}>
                Add New Product
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to={"/view-categories"}
              >
                View All Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/add-category"}>
                Add New Category
              </Link>
            </li>
          </ul>
        </div>

        {/* Address */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to={"/view-address"}
              >
                View All Addresses
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/add-address"}>
                Add New Address
              </Link>
            </li>
          </ul>
        </div>

        {/* StoreHours */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to={"/view-storeHours"}
              >
                View All StoreHours
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/add-storeHours"}>
                Add New StoreHour
              </Link>
            </li>
          </ul>
        </div>

        {/* City */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to={"/view-cities"}
              >
                View All Cities
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/add-cities"}>
                Add New City
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;