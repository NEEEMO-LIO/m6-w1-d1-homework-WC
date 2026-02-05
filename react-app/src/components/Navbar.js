import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { Link, NavLink } from "react-router-dom";

export default function AppNavbar() {
  return (
    <Navbar color="dark" dark expand="md" className="px-4">
      <NavbarBrand tag={Link} to="/">
        Home
      </NavbarBrand>

      <Nav className="ms-auto" navbar>
        <NavItem>
          <NavLink to="/inventories" className="nav-link">
            Inventory List
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}
