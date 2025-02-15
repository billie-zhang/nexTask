import React from "react";
import PropTypes from "prop-types";
import logo from "../assets/logo.png";
import { Form, NavLink } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";

const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to home">
        <img src={logo} alt="" height={40} />
        <h3>nexTask</h3>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(event) => {
            if (!confirm("Delete user and all data? ")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            <span>Delete User</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
};
Nav.propTypes = {
  userName: PropTypes.string,
};

export default Nav;
