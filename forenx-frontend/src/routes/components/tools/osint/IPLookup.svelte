<script>
  import { writable } from "svelte/store";

  // State for IP lookup and results
  let ipAddress = "";
  let ipInfo = null;
  let loading = false;
  let error = "";

  // Function to fetch IP information
  const lookupIP = async () => {
    if (!ipAddress) {
      error = "Please enter an IP address.";
      return;
    }

    error = "";
    loading = true;
    try {
      const res = await fetch(`https://ipinfo.io/${ipAddress}/json`);
      if (!res.ok) throw new Error("Failed to fetch IP info");

      ipInfo = await res.json();
    } catch (err) {
      error = err.message || "An error occurred while fetching IP info";
    } finally {
      loading = false;
    }
  };
</script>

<style>
  .input-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .input-container input {
    flex-grow: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .input-container button {
    background-color: #3490dc;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .input-container button:hover {
    background-color: #2779bd;
  }
  .result {
    margin-top: 1rem;
    padding: 1rem;
    background-color: #2d3748;
    border-radius: 6px;
  }
  .error {
    color: red;
    margin-top: 1rem;
  }
</style>

<div class="p-6">
  <h1 class="text-2xl font-bold mb-4">IP Lookup</h1>

  <!-- Input to enter IP address -->
  <div class="input-container">
    <input 
      type="text" 
      bind:value={ipAddress} 
      placeholder="Enter IP address" 
      class="border"
    />
    <button on:click={lookupIP} class="ml-2">Lookup</button>
  </div>

  <!-- Show loading state -->
  {#if loading}
    <p>Loading...</p>
  {/if}

  <!-- Show error message if any -->
  {#if error}
    <p class="error">{error}</p>
  {/if}

  <!-- Display IP information -->
  {#if ipInfo}
    <div class="result">
      <h2 class="font-bold">IP Information</h2>
      <p><strong>IP Address:</strong> {ipInfo.ip}</p>
      <p><strong>City:</strong> {ipInfo.city || "N/A"}</p>
      <p><strong>Region:</strong> {ipInfo.region || "N/A"}</p>
      <p><strong>Country:</strong> {ipInfo.country || "N/A"}</p>
      <p><strong>Location:</strong> {ipInfo.loc || "N/A"}</p>
      <p><strong>Organization:</strong> {ipInfo.org || "N/A"}</p>
      <p><strong>Hostname:</strong> {ipInfo.hostname || "N/A"}</p>
    </div>
  {/if}
</div>
