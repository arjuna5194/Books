import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";

const Header = ({ searchBooks }) => {
  const [search, setSearch] = useState("");
  const onSearchClick = (e) => {
    e.preventDefault();
    searchBooks(search);
  };
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand">Library</Link>
          <form className="d-flex" role="search" onSubmit={onSearchClick}>
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-secondary" type="submit">
              Search
            </button>
          </form>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <SideBar></SideBar>
      </div>
    </>
  );
};

export default Header;
