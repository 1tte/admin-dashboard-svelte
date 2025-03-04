<script>
    
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { browser } from "$app/environment";
    import { getMe } from "../../lib/api";
    
    let user = null;
    let loginlogs = [];
  
    // Fetch user data & login logs on mount
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
    
  
    const tools = [
      { name: "IP Lookup", icon: "🌍", path: "/tools/ip-lookup" },
      { name: "Whois Lookup", icon: "🔍", path: "/tools/whois-lookup" },
      { name: "Geo Finder", icon: "📍", path: "/tools/geo-finder" },
      { name: "Phone Lookup", icon: "📞", path: "/tools/phone-lookup" },
      { name: "LinkedIn Lookup", icon: "🔗", path: "/tools/linkedin-lookup" }
    ];

    let memoryUsage = "Loading...";
    let processes = [];

    // Fetch system info
    async function fetchSystemInfo() {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5000/api/system-info", {
                headers: { Authorization: `Bearer ${token}` }
            });

            const data = await res.json();
            memoryUsage = data.memoryUsage + "%";
            processes = data.processes || ["No data"];
        } catch (error) {
            console.error("Error fetching system info:", error);
        }
    }

    onMount(fetchSystemInfo);
  </script>
  
  <main class="p-6 bg-gray-900 text-white min-h-screen">
    <!-- Header -->
    <header class="mb-6">
      <h1 class="text-3xl font-bold">Welcome, {user ? user.name : "User"}! 👋</h1>
      <p class="text-gray-400">Let's start investigating with ForenX.</p>
    </header>
  
    <!-- Dashboard Overview -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- RAM Usage -->
    <div class="p-4 bg-gray-800 rounded-lg shadow-md text-white">
        <h2 class="text-lg font-semibold">RAM Usage</h2>
        <p class="text-3xl font-bold">{memoryUsage}</p>
    </div>

    <div class="p-4 bg-gray-800 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold">ID</h2>
        <p class="text-gray-300">{user ? user._id : "Password"}</p>
    </div>

    <div class="p-4 bg-gray-800 rounded-lg shadow-md">
        <h2 class="text-lg font-semibold">Your Last Login</h2>
        <p class="text-gray-300">{logs.length > 0 ? logs[0].loginAt : "No records"}</p>
    </div>
    </section>

    <section class="mt-8">
            <!-- Top Running Processes -->
    <div class="p-4 bg-gray-800 rounded-lg shadow-md text-white">
        <h2 class="text-lg font-semibold">Top Running Processes</h2>
        <ul class="mt-2 space-y-1">
            {#each processes as process}
                <li class="text-sm bg-gray-700 px-2 py-1 rounded">{process}</li>
            {/each}
        </ul>
    </div>
    </section>
  
    <!-- Quick Access to Tools -->
    <section class="mt-8">
      <h2 class="text-2xl font-semibold mb-4">Quick Access</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        {#each tools as tool}
          <button 
            class="p-4 bg-gray-800 rounded-lg flex flex-col items-center justify-center hover:bg-gray-700 transition"
            on:click={() => goto(tool.path)}
          >
            <span class="text-3xl">{tool.icon}</span>
            <span class="mt-2">{tool.name}</span>
          </button>
        {/each}
      </div>
    </section>
  
  </main>
  