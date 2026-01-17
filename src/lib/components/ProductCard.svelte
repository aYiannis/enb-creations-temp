<script lang="ts">
  import { cartState } from '$lib/state/cart.svelte';
  import type { Product } from '$lib/data/products';
  
  let { product }: { product: Product } = $props();
</script>

<div class="group bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-stone-100">
    <div class="relative overflow-hidden aspect-[4/5]">
        <a href="/product/{product.id}" class="block h-full w-full">
            <img src={product.image} alt={product.name} class="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
        </a>
        <!-- Quick Add Overlay -->
        <div class="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition duration-500 bg-white/90 backdrop-blur-sm">
            <button class="w-full bg-rustic-brown text-white py-3 text-sm tracking-wider font-semibold hover:bg-rustic-terracotta transition" onclick={() => cartState.add(product)}>ΠΡΟΣΘΗΚΗ</button>
        </div>
    </div>
    <div class="p-6 text-center">
        <a href="/product/{product.id}" class="block">
            <h3 class="font-serif text-xl text-rustic-brown mb-2 group-hover:text-rustic-terracotta transition">{product.name}</h3>
        </a>
        <div class="flex items-center justify-center gap-3">
            <p class="text-rustic-sage font-bold text-lg">€{product.price.toFixed(2)}</p>
            <!-- Mobile/Accessible Add Button -->
            <button 
                class="md:hidden text-rustic-brown hover:text-rustic-terracotta transition p-1"
                onclick={() => cartState.add(product)}
                aria-label="Προσθήκη στο καλάθι"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </button>
        </div>
    </div>
</div>

