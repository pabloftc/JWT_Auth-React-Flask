import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const history = useHistory();

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Home</span>
        </Link>
        <div className="ml-auto">
          {!store.token ? (
            <div>
              <Link to="/signup">
                <button className="btn btn-primary me-1">Sign Up</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-outline-primary">Log In</button>
              </Link>
            </div>
          ) : (
            <button
              onClick={() => {
                actions.logout();
                history.push("/login");
              }}
              className="btn btn-primary"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
