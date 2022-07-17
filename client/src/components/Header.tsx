import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/react.svg";
type Props = {};

const Header = (props: Props) => {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <div className="d-flex">
            <img src={logo} alt="logo" className="mr-2" />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
