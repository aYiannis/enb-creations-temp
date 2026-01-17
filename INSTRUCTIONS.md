Project: EnB Creations - SvelteKit Migration Guide1. Project SetupRun these commands in your terminal to initialize the project:npm create svelte@latest enb-creations

# Select: Skeleton Project, TypeScript, Prettier, ESLint

cd enb-creations
npm install
npm install -D tailwindcss postcss autoprefixer daisyui
npx tailwindcss init -p
npm install convex @stripe/stripe-js 2. Configuration (Tailwind + DaisyUI)We need to configure DaisyUI to use our custom "Rustic" palette.File: tailwind.config.js/** @type {import('tailwindcss').Config} \*/
export default {
content: ['./src/**/\*.{html,js,svelte,ts}'],
theme: {
extend: {
fontFamily: {
sans: ['Lato', 'sans-serif'],
serif: ['Playfair Display', 'serif'],
}
}
},
plugins: [require('daisyui')],
daisyui: {
themes: [
{
rustic: {
"primary": "#C87960", // rustic-terracotta
"secondary": "#84A98C", // rustic-sage
"accent": "#4A403A", // rustic-stone
"neutral": "#2E2825", // rustic-brown
"base-100": "#F9F7F2", // rustic-cream
"info": "#3abff8",
"success": "#36d399",
"warning": "#fbbd23",
"error": "#f87272",
},
},
],
},
}; 3. Global StylesImport the fonts and Tailwind directives.File: src/app.css@import url('[https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap&subset=greek](https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap&subset=greek)');

@tailwind base;
@tailwind components;
@tailwind utilities;

html {
scroll-behavior: smooth;
} 4. Components BreakdownA. Navigation (src/lib/components/Navbar.svelte)Using DaisyUI navbar component.<script lang="ts">
import { cart } from '$lib/stores/cart'; // (See section 5)
</script>

<div class="navbar bg-base-100/95 backdrop-blur-sm sticky top-0 z-50 border-b border-stone-200">
  <div class="flex-1">
    <a href="/" class="btn btn-ghost text-2xl font-serif font-bold text-neutral">
      E&B Creations
      <span class="text-xs font-sans font-normal text-gray-500 ml-2">| Χειροποίητα</span>
    </a>
  </div>
  <div class="flex-none">
    <!-- Desktop Menu -->
    <ul class="menu menu-horizontal px-1 hidden md:flex font-bold text-stone-600">
      <li><a href="#shop">ΚΑΤΑΣΤΗΜΑ</a></li>
      <li><a href="#about">ΙΣΤΟΡΙΑ</a></li>
      <li><a href="#contact">ΕΠΙΚΟΙΝΩΝΙΑ</a></li>
    </ul>

    <!-- Cart Dropdown -->
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
        <div class="indicator">
          <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <span class="badge badge-sm indicator-item badge-primary text-white">{$cart.length}</span>
        </div>
      </div>
      <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div class="card-body">
          <span class="font-bold text-lg">{$cart.length} Items</span>
          <div class="card-actions">
            <a href="/checkout" class="btn btn-primary btn-block text-white">Ταμείο</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
B. Product Card (src/lib/components/ProductCard.svelte)Using DaisyUI card component.<script lang="ts">
  import { addToCart } from '$lib/stores/cart';
  export let product: { id: string; name: string; price: number; image: string };
</script>

<div class="card bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 group border border-stone-100">
  <figure class="relative aspect-[4/5] overflow-hidden">
    <img src={product.image} alt={product.name} class="object-cover w-full h-full group-hover:scale-110 transition duration-700" />
    <div class="absolute bottom-0 w-full p-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
      <button class="btn btn-neutral w-full rounded-sm" on:click={() => addToCart(product)}>
        ΠΡΟΣΘΗΚΗ
      </button>
    </div>
  </figure>
  <div class="card-body items-center text-center p-6">
    <h2 class="card-title font-serif text-neutral">{product.name}</h2>
    <p class="text-secondary font-bold text-lg">€{product.price.toFixed(2)}</p>
  </div>
</div>
5. State Management (Svelte Store)Simple cart logic.File: src/lib/stores/cart.tsimport { writable } from 'svelte/store';

export const cart = writable([]);

export const addToCart = (product) => {
cart.update((items) => [...items, product]);
// Optional: Trigger a toast notification here
}; 6. Backend Integration (Convex)A. Define SchemaFile: convex/schema.tsimport { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
products: defineTable({
name: v.string(),
description: v.string(),
price: v.number(),
image: v.string(),
inStock: v.boolean(),
}),
});
B. Create QueryFile: convex/products.tsimport { query } from "./\_generated/server";

export const get = query({
handler: async (ctx) => {
return await ctx.db.query("products").collect();
},
});
C. Connect to PageFile: src/routes/+page.svelte<script lang="ts">
import Navbar from '$lib/components/Navbar.svelte';
  import Hero from '$lib/components/Hero.svelte';
import ProductCard from '$lib/components/ProductCard.svelte';
  import Footer from '$lib/components/Footer.svelte';

// Convex Setup
import { useQuery } from "convex-svelte";
import { api } from "../convex/\_generated/api";

const products = useQuery(api.products.get);
</script>

<Navbar />
<Hero />

<section id="shop" class="py-24 bg-base-100">
  <div class="container mx-auto px-6">
    <div class="text-center mb-16">
      <h2 class="font-serif text-4xl font-bold text-neutral mb-4">Τρέχουσα Συλλογή</h2>
    </div>

    {#if $products.isLoading}
      <div class="flex justify-center"><span class="loading loading-spinner loading-lg text-primary"></span></div>
    {:else if $products.error}
      <p class="text-error">Error loading products</p>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each $products.data as product}
          <ProductCard {product} />
        {/each}
      </div>
    {/if}

  </div>
</section>

<Footer />
7. Payments (Stripe)Create an API endpoint in SvelteKit to create a Stripe Session.File: src/routes/api/checkout/+server.tsimport { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function POST({ request }) {
const { items } = await request.json();

// Convert cart items to Stripe line items
const lineItems = items.map(item => ({
price_data: {
currency: 'eur',
product_data: { name: item.name, images: [item.image] },
unit_amount: item.price \* 100, // Stripe expects cents
},
quantity: 1,
}));

const session = await stripe.checkout.sessions.create({
line_items: lineItems,
mode: 'payment',
success_url: `${request.url.origin}/success`,
cancel_url: `${request.url.origin}/cancel`,
});

return json({ url: session.url });
}
