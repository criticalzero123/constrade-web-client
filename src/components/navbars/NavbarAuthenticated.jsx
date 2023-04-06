import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { useUserInfo } from "../../hooks/useUserInfo";

const NavbarAuthenticated = () => {
  const { user, person } = useUserInfo();
  console.log(user, person);
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="https://flowbite.com/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          ConsTrade
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={<Avatar alt="User" img={user.imageUrl} rounded={true} />}
        >
          <Dropdown.Header>
            <span className="block text-sm capitalize">
              {person.firstName} {person.lastName}
            </span>
            <span className="block truncate text-sm font-medium">
              {user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to="/discover" active={true}>
          Discover
        </Link>
        <Link to="/community">Community</Link>
        <Link to="/messages/u">Messages</Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarAuthenticated;
