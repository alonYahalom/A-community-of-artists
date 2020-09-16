import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {};

  render() {
    const { user } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/home">
            <img src="/images/logo.png" alt="Logo" width="40" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              {user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/my-gallery">
                      My Gallery
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/wish-list">
                      WishList
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
            </ul>
            <ul className="navbar-nav ml-auto">
              {!user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/user/signin">
                      Signin
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/user/signup">
                      Signup
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
              {user && (
                <li className="nav-item ">
                  <NavLink className="nav-link " to="/user/logout">
                    <i alt="logout" className="fas fa-sign-out-alt "></i>
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
