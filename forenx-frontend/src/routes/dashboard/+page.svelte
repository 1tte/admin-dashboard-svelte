<script>
  import { onMount } from "svelte";
  import { getMe } from "$lib/api";
  import { goto } from "$app/navigation";
  import Sidebar from "../components/Sidebar.svelte";
  import Dashboard from "../components/Dashboard.svelte";

  let user = null;
  let error = ""; // To handle any error message

  onMount(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      error = "Not logged in"; // Set error if no token
      goto("/login"); // Redirect to login if no token
      return;
    }

    try {
      const res = await getMe(token); // Fetch user data
      if (res.message) {
        error = res.message; // Set error if there’s an issue
        localStorage.removeItem("token"); // Clear invalid token
        goto("/login"); // Redirect to login page
      } else {
        user = res; // Set user data
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
      error = "Failed to fetch user data"; // Handle error fetching user data
      localStorage.removeItem("token"); // Clear token in case of failure
      goto("/login"); // Redirect to login page
    }
  });
</script>

<div class="flex h-screen bg-gray-900 text-white">
  <!-- Sidebar -->
  <Sidebar />

  <!-- Main Content Area -->
  <div class="flex-auto p-6">
    <!-- Show error message if any -->
    {#if error}
      <div class="text-red-500 mb-4">
        {error}
      </div>
    {/if}

    <!-- Show dashboard or user content here -->
    {#if user}
      <Dashboard />
    {/if}
  </div>
</div>
