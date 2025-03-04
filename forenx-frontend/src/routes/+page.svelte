<script>
    import { onMount } from "svelte";

    let message = "Selamat datang di ForenX!";
    onMount(() => {
        console.log("Dashboard loaded");
    });
</script>

<main class="h-screen flex items-center justify-center bg-gray-900 text-white">
    <h1 class="text-3xl font-bold">{message}</h1>
</main>
