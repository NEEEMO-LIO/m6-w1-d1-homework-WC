import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home";
import InventoryList from "./components/InventoryList";
import AddInventory from "./components/AddInventory";
import EditInventory from "./components/EditInventory";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/inventories" element={<InventoryList />} />
        <Route path="/inventories/new" element={<AddInventory />} />
        <Route path="/inventories/:id" element={<EditInventory />} />

        {/* 兜底：任何未知路径回到首页 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
