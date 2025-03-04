<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { getMe } from "$lib/api"; // API untuk ambil data user

  
  let activeDropdown = null;
  let showProfileDropdown = false;
  let user = null;

  const toggleDropdown = (category) => {
    activeDropdown = activeDropdown === category ? null : category;
  };

  // 🔹 Ambil user dari backend saat komponen dimuat
  onMount(async () => {
  const token = localStorage.getItem("token");
  if (!token) {
      user = null;
      goto("/login");
      return;
  }

  try {
      const data = await getMe(token);
      if (data.message) throw new Error(data.message);
      user = data; // Save user info
  } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("token"); // ❌ Remove token if invalid
      user = null;
      goto("/login");
  }
  });


  // 🔹 Fungsi Logout
  const logout = async () => {
  const token = localStorage.getItem("token");
  
  if (token) {
      await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      });
  }

  localStorage.removeItem("token"); // ✅ Remove token from localStorage
  user = null;
  showProfileDropdown = false;
  goto("/login"); // Redirect to login
  };



  
  onMount(async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        user = null;
        return;
      }

      try {
        const data = await getMe(token);
        if (data.message) throw new Error(data.message);
        user = data;
      } catch (error) {
        console.error("Failed to fetch user:", error);
        localStorage.removeItem("token");
        user = null;
      }
    });

    const tools = [
      { name: "Dashboard", component: "Dashboard" },
      { 
        name: "OSINT Tools", 
        sub: [
          { name: "IP Lookup", component: "IPLookup" },
          { name: "Whois Lookup", component: "WhoisLookup" },
          { name: "Geo Finder", component: "GeoFinder" }
        ]
      }
    ];
</script>
  
  <aside class="w-64 h-screen bg-gray-900 text-white flex flex-col fixed left-0 top-0">
    <!-- Logo -->
    <div class="flex items-center justify-center p-4 border-b border-gray-700">
      <span class="text-xl font-bold">ForenX</span>
    </div>
  
    <!-- Navigasi -->
        
    <nav class="flex-1 px-4 py-6 space-y-2">
      {#each tools as tool}
        <div>
          <button 
            class="w-full text-left px-4 py-2 hover:bg-gray-700 rounded transition flex justify-between items-center"
            on:click={() => tool.sub ? toggleDropdown(tool.name) : selectedTool.set(tool.component)}
          >
            <span>{tool.name}</span>
          </button>

          {#if activeDropdown === tool.name}
            <div class="pl-6 mt-1 space-y-1">
              {#each tool.sub as subtool}
                <button 
                  class="w-full text-left px-4 py-2 hover:bg-gray-700 rounded transition"
                  on:click={() => selectedTool.set(subtool.component)}
                >
                  {subtool.name}
                </button>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </nav>
      
    <!-- Profil -->
    <div class="relative px-4 py-6 border-t border-gray-700">
      <button class="flex items-center w-full text-left" on:click={() => showProfileDropdown = !showProfileDropdown}>
          <!-- <img src="/user-avatar.jpg" alt="User Avatar" class="h-10 w-10 rounded-full mr-3"> -->
          <div>
          <span class="font-medium">{user ? user.name : "Loading..."}</span>
          <div class="text-sm text-gray-400">{user ? user.email : ""}</div>
          </div>
      </button>

      <!-- Dropdown Profil -->
      {#if showProfileDropdown}
          <div class="absolute left-4 bottom-20 w-48 bg-gray-800 rounded shadow-lg py-2">
          <button class="block w-full text-left px-4 py-2 hover:bg-gray-700">My Profile</button>
          <button class="block w-full text-left px-4 py-2 hover:bg-gray-700">Account Settings</button>
          <hr class="border-gray-700" />
          <button on:click={logout} class="block w-full text-left px-4 py-2 hover:bg-red-600">Sign Out</button>
          </div>
      {/if}
      </div>
  </aside>
  