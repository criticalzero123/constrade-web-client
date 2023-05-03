import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUserInfo } from "../../hooks/useUserInfo";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/action/authActions";

const NavbarAuthenticated = () => {
  const location = useLocation();
  const active = location.pathname.split("/");
  const { user, person } = useUserInfo();

  const dispatch = useDispatch();

  if (user === undefined || person === undefined) return <p>Loading...</p>;

  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href={"/discover"}>
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
            <Link to={`/users/my`}>
              <span className="block text-sm capitalize">
                {person.firstName} {person.lastName}
              </span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Link>
          </Dropdown.Header>
          <Link to="/products/list/my" className="w-full">
            <Dropdown.Item>My Listings</Dropdown.Item>
          </Link>
          <Link to="/wishlist" className="w-full">
            <Dropdown.Item>Wishlist</Dropdown.Item>
          </Link>

          <Link to="/wallet" className="w-full">
            <Dropdown.Item>Wallet</Dropdown.Item>
          </Link>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => dispatch(logoutUser())}>
            Sign out
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link
          to="/discover"
          className={`${active[1] === "discover" && "text-[#CC481F]"}`}
        >
          Discover
        </Link>
        <Link
          to="/community"
          className={`${active[1] === "community" && "text-[#CC481F]"}`}
        >
          Community
        </Link>
        <Link
          to="/messages/u"
          className={`${active[1] === "messages" && "text-[#CC481F]"}`}
        >
          Messages
        </Link>
        {/* <Link to="/products/add/search">Add Product</Link> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarAuthenticated;
