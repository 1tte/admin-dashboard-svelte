<script>
    import { onMount } from "svelte";
    import { checkAuth } from "$lib/auth";
  
    onMount(() => {
      checkAuth();
    });
  </script>
  
  <slot />
  