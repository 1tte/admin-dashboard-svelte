<script>
    import { registerUser } from "$lib/api";
    import { goto } from "$app/navigation";
  
    let name = "";
    let email = "";
    let password = "";
    let errorMsg = "";
  
    const handleRegister = async () => {
      const res = await registerUser(name, email, password);
      if (res.user) {
        goto("/login");
      } else {
        errorMsg = res.message;
      }
    };
  </script>
  
  <main class="flex flex-col items-center justify-center h-screen">
    <div class="p-6 max-w-sm bg-white rounded-lg shadow-md">
      <h2 class="text-xl font-semibold text-gray-700 text-center">Register</h2>
  
      {#if errorMsg}
        <p class="text-red-500 text-sm">{errorMsg}</p>
      {/if}
  
      <input bind:value={name} type="text" placeholder="Nama" class="w-full p-2 border rounded mt-4" />
      <input bind:value={email} type="email" placeholder="Email" class="w-full p-2 border rounded mt-2" />
      <input bind:value={password} type="password" placeholder="Password" class="w-full p-2 border rounded mt-2" />
  
      <button on:click={handleRegister} class="w-full bg-green-500 text-white p-2 rounded mt-4">Daftar</button>
      <p class="text-sm mt-2">Sudah punya akun? <a href="/login" class="text-blue-500">Login</a></p>
    </div>
  </main>
  