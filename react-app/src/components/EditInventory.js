import React, { useEffect, useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppNavbar from "./Navbar";
import { getInventory, updateInventory } from "../services/inventory.service";

export default function EditInventory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    _id: "",
    prodname: "",
    qty: "",
    price: "",
    status: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const data = await getInventory(id);
        if (mounted && data) setItem(data);
      } catch (err) {
        alert(err?.message || "Failed to load item");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setItem((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await updateInventory(item);
      navigate("/inventories");
    } catch (err) {
      alert(err?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <AppNavbar />

      <Container className="p-4">
        <h2 className="mt-3">Edit Inventory</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="prodname" className="h6 mt-3">
                Product Name
              </Label>
              <Input
                id="prodname"
                name="prodname"
                type="text"
                value={item.prodname || ""}
                onChange={handleChange}
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
                value={item.qty || ""}
                onChange={handleChange}
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
                value={item.price || ""}
                onChange={handleChange}
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
                value={item.status || ""}
                onChange={handleChange}
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
        )}
      </Container>
    </div>
  );
}
