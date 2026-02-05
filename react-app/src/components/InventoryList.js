import React, { useEffect, useState } from "react";
import { Container, Button, ButtonGroup, Table } from "reactstrap";
import { Link } from "react-router-dom";
import AppNavbar from "./Navbar";
import { getInventories, deleteInventory } from "../services/inventory.service";

export default function InventoryList() {
  const [inventories, setInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  async function load() {
    setErrMsg("");
    setIsLoading(true);
    try {
      const data = await getInventories();
      setInventories(Array.isArray(data) ? data : []);
    } catch (err) {
      setErrMsg(err?.message || "Failed to load inventories");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id) {
    const ok = window.confirm("Delete this item?");
    if (!ok) return;

    try {
      await deleteInventory(id);
      setInventories((prev) => prev.filter((x) => x._id !== id));
    } catch (err) {
      alert(err?.message || "Delete failed");
    }
  }

  if (isLoading) {
    return (
      <div>
        <AppNavbar />
        <Container fluid className="p-4">
          <p>Loading...</p>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <AppNavbar />

      <Container fluid className="p-4">
        {errMsg && <p className="text-danger">{errMsg}</p>}

        <div className="d-flex justify-content-end mb-3">
          <Button color="success" tag={Link} to="/inventories/new">
            Add inventory
          </Button>
        </div>

        <h3>Inventory List</h3>

        <Table bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th width="35%">Product Name</th>
              <th width="15%">Quantity</th>
              <th width="15%">Price</th>
              <th width="15%">Status</th>
              <th width="20%">Actions</th>
            </tr>
          </thead>

          <tbody>
            {inventories.map((inv) => (
              <tr key={inv._id}>
                <td style={{ whiteSpace: "nowrap" }}>{inv.prodname}</td>
                <td>{inv.qty}</td>
                <td>{inv.price}</td>
                <td>{inv.status}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      size="sm"
                      color="primary"
                      tag={Link}
                      to={`/inventories/${inv._id}`}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      color="danger"
                      onClick={() => handleDelete(inv._id)}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}

            {inventories.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No inventories found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
