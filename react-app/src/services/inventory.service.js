const API_URL = "http://localhost:8080/api";

async function handleJson(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return null;
  return res.json();
}

export async function getInventories() {
  const res = await fetch(`${API_URL}/inventories`);
  return handleJson(res);
}

export async function getInventory(id) {
  const res = await fetch(`${API_URL}/inventory/${id}`);
  return handleJson(res);
}

export async function createInventory(data) {
  const res = await fetch(`${API_URL}/inventory`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return handleJson(res);
}

export async function updateInventory(data) {
  const res = await fetch(`${API_URL}/inventory`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return handleJson(res);
}

export async function deleteInventory(id) {
  const res = await fetch(`${API_URL}/inventory/${id}`, {
    method: "DELETE"
  });
  return handleJson(res);
}
