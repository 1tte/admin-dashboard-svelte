import { writable } from "svelte/store";

// Create a writable store to manage the selected tool/view
export const selectedTool = writable("Dashboard");  // Default view is 'Dashboard'
