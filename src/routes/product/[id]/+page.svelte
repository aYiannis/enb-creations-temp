<script lang="ts">
  import { cartState } from '$lib/state/cart.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  // Derived state for the product to ensure reactivity if data changes (though it likely won't on client-side nav to same component without load rerun)
  let product = $derived(data.product); 
</script>

<Navbar />

<main class="min-h-screen bg-rustic-cream py-12 md:py-24">
  <div class="container mx-auto px-6 max-w-6xl">
    <!-- Breadcrumb -->
    <div class="text-sm text-stone-500 mb-8">
      <a href="/" class="hover:text-rustic-terracotta transition">Αρχική</a>
      <span class="mx-2">/</span>
      <a href="/#shop" class="hover:text-rustic-terracotta transition">Κατάστημα</a>
      <span class="mx-2">/</span>
      <span class="text-rustic-brown font-semibold">{product.name}</span>
    </div>

    <div class="flex flex-col md:flex-row gap-12 bg-white p-6 md:p-12 rounded-lg shadow-sm border border-stone-100">
      
      <!-- Product Image -->
      <div class="w-full md:w-1/2">
        <div class="aspect-[4/5] overflow-hidden rounded-sm relative group">
           <img 
            src={product.image} 
            alt={product.name} 
            class="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" 
          />
        </div>
      </div>

      <!-- Product Info -->
      <div class="w-full md:w-1/2 flex flex-col justify-center">
        <h1 class="font-serif text-3xl md:text-5xl text-rustic-brown mb-4 leading-tight">{product.name}</h1>
        <p class="text-2xl text-rustic-sage font-bold mb-8">€{product.price.toFixed(2)}</p>
        
        <div class="prose text-stone-600 mb-10 leading-relaxed">
          <p>{product.description || 'Δεν υπάρχει διαθέσιμη περιγραφή για αυτό το προϊόν.'}</p>
        </div>

        <div class="flex flex-col gap-4">
          <button 
            onclick={() => cartState.add(product)}
            class="btn bg-rustic-brown text-white hover:bg-rustic-terracotta border-none w-full md:w-auto py-4 h-auto text-lg tracking-widest font-bold transition-all"
          >
            ΠΡΟΣΘΗΚΗ ΣΤΟ ΚΑΛΑΘΙ
          </button>
          
          <div class="text-xs text-stone-400 mt-4 space-y-2">
            <p class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
              Άμεσα διαθέσιμο
            </p>
            <p class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              Δωρεάν μεταφορικά
            </p>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</main>

<Footer />
