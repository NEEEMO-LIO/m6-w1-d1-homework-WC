import React, { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import AppNavbar from "./Navbar";
import { createInventory } from "../services/inventory.service";

export default function AddInventory() {
  const navigate = useNavigate();

  const [item, setItem] = useState({
    prodname: "",
    qty: "",
    price: "",
    status: ""
  });

  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await createInventory(item);
      navigate("/inventories");
    } catch (err) {
      alert(err?.message || "Create failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AppNavbar />

      <Container className="p-4">
        <h2 className="mt-3">Add Inventory</h2>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="prodname" className="h6 mt-3">
              Product Name
            </Label>
            <Input
              id="prodname"
              name="prodname"
              type="text"
              value={item.prodname}
              onChange={handleChange}
              autoComplete="prodname"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="qty" className="h6 mt-3">
              Quantity
            </Label>
            <Input
              id="qty"
              name="qty"
              type="text"
              value={item.qty}
              onChange={handleChange}
              autoComplete="qty"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="price" className="h6 mt-3">
              Price
            </Label>
            <Input
              id="price"
              name="price"
              type="text"
              value={item.price}
              onChange={handleChange}
              autoComplete="price"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="status" className="h6 mt-3">
              Status
            </Label>
            <Input
              id="status"
              name="status"
              type="text"
              value={item.status}
              onChange={handleChange}
              autoComplete="status"
              required
            />
          </FormGroup>

          <div className="mt-4">
            <Button color="primary" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>{" "}
            <Button color="secondary" tag={Link} to="/inventories">
              Cancel
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
