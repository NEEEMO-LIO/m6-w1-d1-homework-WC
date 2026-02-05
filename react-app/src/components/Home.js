import React from "react";
import { Container, Button } from "reactstrap";
import { Link } from "react-router-dom";
import AppNavbar from "./Navbar";

export default function Home() {
  return (
    <div>
      <AppNavbar />

      <Container fluid className="p-5">
        <Button color="primary" className="mt-3" tag={Link} to="/inventories">
          Manage Inventory List
        </Button>
      </Container>
    </div>
  );
}
