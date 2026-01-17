<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import { cart } from '$lib/stores/cart.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div data-theme="rustic" class="min-h-screen bg-rustic-cream font-sans text-rustic-stone flex flex-col">
	{@render children()}
</div>

<!-- Notification Toast -->
<div class="fixed bottom-5 right-5 bg-rustic-stone text-white px-6 py-4 rounded shadow-2xl transform transition-transform duration-300 z-50 flex items-center gap-3 {cart.notification.visible ? 'translate-y-0' : 'translate-y-24 opacity-0'}">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-rustic-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    </svg>
    <div>
        <h4 class="font-bold text-sm">Προστέθηκε στο καλάθι!</h4>
        <p class="text-xs text-stone-300">{cart.notification.message}</p>
    </div>
</div>
