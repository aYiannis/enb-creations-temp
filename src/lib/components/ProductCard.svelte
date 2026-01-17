<script lang="ts">
  import { cart, type Product } from '$lib/stores/cart.svelte';
  
  let { product }: { product: Product } = $props();
</script>

<div class="group bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden border border-stone-100">
    <div class="relative overflow-hidden aspect-[4/5]">
        <img src={product.image} alt={product.name} class="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
        <!-- Quick Add Overlay -->
        <div class="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition duration-500 bg-white/90 backdrop-blur-sm">
            <button class="w-full bg-rustic-brown text-white py-3 text-sm tracking-wider font-semibold hover:bg-rustic-terracotta transition" onclick={() => cart.add(product)}>ΠΡΟΣΘΗΚΗ</button>
        </div>
    </div>
    <div class="p-6 text-center">
        <h3 class="font-serif text-xl text-rustic-brown mb-2 group-hover:text-rustic-terracotta transition">{product.name}</h3>
        <p class="text-rustic-sage font-bold text-lg">€{product.price.toFixed(2)}</p>
    </div>
</div>

