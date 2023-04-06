import { Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const NavbarNotAuthenticated = () => {
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand to="/navbars">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          ConsTrade
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Link to="/login" className="py-2 px-6 hover:text-[#CC481F]">
          Login
        </Link>
        <Link
          to="/register"
          className="py-2 px-6 hover:text-white rounded hover:bg-[#CC481F] border-2 border-[#CC481F] text-[#CC481F]"
        >
          Register
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarNotAuthenticated;
