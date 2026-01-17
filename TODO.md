EnB Creations - Fix Guide (Svelte 5 & Colors)1. Fixed Tailwind Config (tailwind.config.ts)The main issue was likely that DaisyUI overrode your base styles or the text colors weren't mapping to base-content.Changes:Included the explicit rustic-\* colors so you can still use classes like bg-rustic-cream.Configured the DaisyUI rustic theme to set base-100 (background) and base-content (text) correctly.import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('tailwindcss').Config} \*/
export default {
content: ['./src/**/\*.{html,js,svelte,ts}'],
theme: {
extend: {
colors: {
// Explicitly keeping your custom names for flexibility
'rustic-cream': '#F9F7F2',
'rustic-stone': '#4A403A',
'rustic-terracotta': '#C87960',
'rustic-sage': '#84A98C',
'rustic-brown': '#2E2825'
},
fontFamily: {
sans: ['Lato', 'sans-serif'],
serif: ['Playfair Display', 'serif']
}
}
},
plugins: [require('daisyui')],
daisyui: {
themes: [
{
rustic: {
"primary": "#C87960", // Terracotta (Buttons/Links)
"primary-content": "#FFFFFF", // White text on primary buttons
"secondary": "#84A98C", // Sage (Prices/Accents)
"secondary-content": "#FFFFFF",

    				"accent": "#4A403A",            // Stone
    				"neutral": "#2E2825",           // Brown (Dark backgrounds/Footer)
    				"neutral-content": "#F9F7F2",   // Cream text on neutral backgrounds

    				"base-100": "#F9F7F2",          // Cream (Page Background)
    				"base-content": "#4A403A",      // Stone (Default Text Color) - CRITICAL FIX

    				"info": "#3abff8",
    				"success": "#36d399",
    				"warning": "#fbbd23",
    				"error": "#f87272",
    			},
    		},
    	],
    },

}; 2. Global State with Runes (src/lib/state/cart.svelte.ts)Instead of Stores (writable), we use a .svelte.ts file with a class and $state.// src/lib/state/cart.svelte.ts
export type Product = {
id: string; // or number, depending on Convex
name: string;
price: number;
image: string;
};

class CartState {
items = $state<Product[]>([]);

    // Derived state (getter)
    get total() {
    	return this.items.reduce((sum, item) => sum + item.price, 0);
    }

    get count() {
    	return this.items.length;
    }

    add(product: Product) {
    	this.items.push(product);
    	// Optional: Add simple toast logic here or trigger an effect
    }

    remove(index: number) {
    	this.items.splice(index, 1);
    }

    clear() {
    	this.items = [];
    }

}

// Export a singleton instance
export const cartState = new CartState(); 3. Navbar Component (src/lib/components/Navbar.svelte)Updated to use the cartState singleton and correct DaisyUI classes.<script lang="ts">
import { cartState } from '$lib/state/cart.svelte';
</script>

<!-- Note: 'bg-base-100/95' uses the rustic-cream color defined in tailwind config -->
<div class="navbar bg-base-100/95 backdrop-blur-sm sticky top-0 z-50 border-b border-stone-200">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-2xl font-serif font-bold text-neutral hover:text-primary transition-colors">
			E&B Creations
			<span class="text-xs font-sans font-normal text-stone-500 ml-2">| Χειροποίητα</span>
		</a>
	</div>
	
	<div class="flex-none">
		<!-- Desktop Menu -->
		<ul class="menu menu-horizontal px-1 hidden md:flex font-bold text-stone-600">
			<li><a href="#shop" class="hover:text-primary">ΚΑΤΑΣΤΗΜΑ</a></li>
			<li><a href="#about" class="hover:text-primary">ΙΣΤΟΡΙΑ</a></li>
			<li><a href="#contact" class="hover:text-primary">ΕΠΙΚΟΙΝΩΝΙΑ</a></li>
		</ul>

    	<!-- Cart Dropdown -->
    	<div class="dropdown dropdown-end">
    		<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
    			<div class="indicator">
    				<svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" class="h-5 w-5 text-neutral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    				</svg>
    				<!-- Svelte 5 Reactivity: cartState.count updates automatically -->
    				<span class="badge badge-sm indicator-item badge-primary text-white border-none">
    					{cartState.count}
    				</span>
    			</div>
    		</div>

    		<div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-white shadow-xl border border-stone-100">
    			<div class="card-body">
    				<span class="font-bold text-lg text-stone-700">{cartState.count} Αντικείμενα</span>
    				<span class="text-secondary">Σύνολο: €{cartState.total.toFixed(2)}</span>
    				<div class="card-actions">
    					<a href="/checkout" class="btn btn-primary btn-block text-white">Ταμείο</a>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>

</div>
4. Product Card Component (src/lib/components/ProductCard.svelte)Updated to use cartState.add().<script lang="ts">
	import { cartState, type Product } from '$lib/state/cart.svelte';
	
	// Svelte 5 Props
	let { product } = $props<{ product: Product }>();
</script>

<div class="card bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 group border border-stone-100 overflow-hidden">
	<figure class="relative aspect-[4/5] overflow-hidden">
		<img 
			src={product.image} 
			alt={product.name} 
			class="object-cover w-full h-full group-hover:scale-110 transition duration-700" 
		/>
		
		<!-- Quick Add Button Overlay -->
		<div class="absolute bottom-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm">
			<button 
				class="btn btn-neutral w-full rounded-sm text-white hover:bg-primary border-none" 
				onclick={() => cartState.add(product)}
			>
				ΠΡΟΣΘΗΚΗ
			</button>
		</div>
	</figure>
	
	<div class="card-body items-center text-center p-6 gap-2">
		<h2 class="card-title font-serif text-neutral text-xl">{product.name}</h2>
		<p class="text-secondary font-bold text-lg">€{product.price.toFixed(2)}</p>
	</div>
</div>
5. Main Page (src/routes/+page.svelte)Updated to correctly handle Convex data. Ensure your Convex query returns an array.<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ProductCard from '$lib/components/ProductCard.svelte';
	
	// Convex integration
	import { useQuery } from "convex-svelte";
	import { api } from "../../convex/_generated/api";

    const productsQuery = useQuery(api.products.get);

</script>

<!-- Global Font Import (if not in app.html) -->

<svelte:head>
<link href="[https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap&subset=greek](https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap&subset=greek)" rel="stylesheet">
</svelte:head>

<div class="min-h-screen bg-base-100 font-sans text-base-content selection:bg-primary selection:text-white">
	<Navbar />

    <!-- Hero Section -->
    <header class="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center bg-fixed bg-cover bg-center"
    		style="background-image: url('[https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2560&auto=format&fit=crop](https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=2560&auto=format&fit=crop)');">
    	<div class="absolute inset-0 bg-black/40"></div>
    	<div class="relative z-10 text-center px-4 animate-fade-in-up text-white">
    		<span class="block text-sm md:text-base tracking-[0.2em] mb-4 font-bold">ΙΔΡΥΘΗΚΕ ΤΟ 2023</span>
    		<h1 class="font-serif text-5xl md:text-7xl font-bold mb-6 drop-shadow-md leading-tight">
    			Χειροποίητα με<br><span class="italic font-light">Αγάπη & Φροντίδα</span>
    		</h1>
    		<a href="#shop" class="btn btn-primary btn-lg rounded-sm px-10 text-white border-none shadow-lg hover:-translate-y-1 transition-transform">
    			Δείτε τη Συλλογή
    		</a>
    	</div>
    </header>

    <!-- Shop Section -->
    <section id="shop" class="py-24 bg-base-100">
    	<div class="container mx-auto px-6">
    		<div class="text-center mb-16 max-w-2xl mx-auto">
    			<span class="text-secondary font-bold tracking-widest text-xs mb-2 block">ΤΟ ΚΑΤΑΣΤΗΜΑ</span>
    			<h2 class="font-serif text-4xl font-bold text-neutral mb-4">Τρέχουσα Συλλογή</h2>
    		</div>

    		{#if $productsQuery.isLoading}
    			<div class="flex justify-center py-20">
    				<span class="loading loading-spinner loading-lg text-primary"></span>
    			</div>
    		{:else if $productsQuery.error}
    			<div class="alert alert-error">
    				<span>Σφάλμα φόρτωσης προϊόντων.</span>
    			</div>
    		{:else}
    			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    				{#each $productsQuery.data as product (product.id || product._id)}
    					<ProductCard {product} />
    				{/each}
    			</div>
    		{/if}
    	</div>
    </section>

    <!-- Footer Placeholder -->
    <footer class="footer p-10 bg-neutral text-neutral-content">
    	<aside>
    		<h3 class="font-serif text-3xl mb-4">E&B Creations</h3>
    		<p>Χειροποίητα αγαθά περιορισμένης παραγωγής.<br/>Φτιαγμένα με πρόθεση.</p>
    	</aside>
    	<nav>
    		<h6 class="footer-title text-white opacity-100">ΕΞΕΡΕΥΝΗΣΗ</h6>
    		<a href="#shop" class="link link-hover hover:text-primary">Συλλογή</a>
    		<a href="#about" class="link link-hover hover:text-primary">Η Ιστορία μας</a>
    	</nav>
    </footer>

</div>

<style>
	/* Add your Fade In animation here or in app.css */
	.animate-fade-in-up {
		animation: fadeInUp 1s ease-out forwards;
	}
	@keyframes fadeInUp {
		from { opacity: 0; transform: translateY(20px); }
		to { opacity: 1; transform: translateY(0); }
	}
</style>
