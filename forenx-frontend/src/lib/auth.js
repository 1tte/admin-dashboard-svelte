import { browser } from "$app/environment";
import { goto } from "$app/navigation";

const API_URL = "http://localhost:5000/api/auth/me"; // Adjust as needed

export async function checkAuth() {
  if (browser) {
    const token = localStorage.getItem("token");

    if (!token) {
      goto("/login");
      return;
    }

    try {
      // ✅ Verify token with backend
      const res = await fetch(API_URL, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        localStorage.removeItem("token"); // ❌ Remove invalid token
        goto("/login");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      localStorage.removeItem("token");
      goto("/login");
    }
  }
}

// 🔹 Logout Function (Removes Token & Notifies Server)
export async function logout() {
  if (browser) {
    const token = localStorage.getItem("token");

    if (token) {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    localStorage.removeItem("token"); // ✅ Clear stored token
    goto("/login");
  }
}

