<script>
    import { loginUser } from "$lib/api";
    import { goto } from "$app/navigation";
    let email = "";
    let password = "";
    let errorMsg = "";

    const handleLogin = async () => {
        const res = await loginUser(email, password);
        if (res.token) {
            localStorage.setItem("token", res.token);
            goto("/dashboard");
        } else {
            errorMsg = res.message;
        }
    };
</script>

<main class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div class="p-6 max-w-sm bg-white rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-gray-700 text-center">Login</h2>
        {#if errorMsg}
            <p class="text-red-500 text-sm">{errorMsg}</p>
        {/if}
        <input bind:value={email} type="email" placeholder="Email" class="w-full p-2 border rounded mt-4" />
        <input bind:value={password} type="password" placeholder="Password" class="w-full p-2 border rounded mt-2" />
        <button on:click={handleLogin} class="w-full bg-blue-500 text-white p-2 rounded mt-4">Login</button>
        <p class="text-sm mt-2">Belum punya akun? <a href="/register" class="text-blue-500">Daftar</a></p>
    </div>
</main>
