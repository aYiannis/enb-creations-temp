<script lang="ts">
  import { cartState } from '$lib/state/cart.svelte';
  
  let menuOpen = $state(false);

  function toggleMenu() {
    menuOpen = !menuOpen;
  }
</script>

<style>
    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #e7e5e4;
        border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #d6d3d1;
    }
</style>

<nav class="sticky top-0 z-50 bg-rustic-cream/95 backdrop-blur-sm border-b border-stone-200 shadow-sm transition-all duration-300" id="navbar">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <!-- Logo -->
        <a href="/" class="font-serif text-2xl font-bold tracking-wide text-rustic-brown hover:text-rustic-terracotta transition duration-300 group">
            E&B Creations <span class="text-sm font-sans font-normal text-stone-500 group-hover:text-rustic-terracotta/70 transition">| Χειροποίητα</span>
        </a>

        <!-- Desktop Menu Links -->
        <div class="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide text-stone-600">
            <a href="#shop" class="hover:text-rustic-terracotta transition duration-300">ΚΑΤΑΣΤΗΜΑ</a>
            <a href="#about" class="hover:text-rustic-terracotta transition duration-300">Η ΙΣΤΟΡΙΑ ΜΑΣ</a>
            <a href="#contact" class="hover:text-rustic-terracotta transition duration-300">ΕΠΙΚΟΙΝΩΝΙΑ</a>
        </div>

        <!-- Right Side Actions (Cart & Mobile Menu) -->
        <div class="flex items-center gap-4">
            <!-- Cart Icon -->
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="relative group p-2" aria-label="Shopping Cart">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-rustic-brown group-hover:text-rustic-terracotta transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span class="absolute top-0 right-0 bg-rustic-terracotta text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{cartState.count}</span>
                </div>
                <div tabindex="0" role="menu" class="mt-3 z-[1] card card-compact dropdown-content w-72 bg-white shadow-xl border border-stone-100">
                    <div class="card-body">
                        <span class="font-bold text-lg text-stone-700 border-b border-stone-100 pb-2">{cartState.count} Αντικείμενα</span>
                        
                        {#if cartState.items.length > 0}
                            <div class="max-h-60 overflow-y-auto py-2 space-y-3 custom-scrollbar">
                                {#each cartState.items as item, i}
                                    <div class="flex items-center gap-3 group">
                                        <img src={item.image} alt={item.name} class="w-12 h-12 object-cover rounded shadow-sm" />
                                        <div class="flex-grow min-w-0">
                                            <p class="text-xs font-semibold text-stone-700 truncate">{item.name}</p>
                                            <p class="text-xs text-rustic-sage font-bold">€{item.price.toFixed(2)}</p>
                                        </div>
                                        <button 
                                            class="text-stone-300 hover:text-red-400 transition-colors p-1"
                                            onclick={(e) => { e.preventDefault(); cartState.remove(i); }}
                                            aria-label="Αφαίρεση"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                {/each}
                            </div>
                            <div class="border-t border-stone-100 pt-2 mt-1">
                                <span class="text-stone-500 text-xs">Σύνολο:</span>
                                <span class="text-rustic-brown font-bold float-right">€{cartState.total.toFixed(2)}</span>
                            </div>
                            <div class="card-actions mt-4">
                                <a href="/checkout" class="btn bg-rustic-brown hover:bg-rustic-terracotta border-none text-white btn-block btn-sm h-10">Ταμείο</a>
                            </div>
                        {:else}
                            <p class="text-center py-4 text-stone-400 text-sm italic">Το καλάθι είναι άδειο</p>
                            <div class="card-actions">
                                <button class="btn btn-ghost btn-block btn-sm pointer-events-none text-stone-300">Ταμείο</button>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>

            <!-- Mobile Menu Button -->
            <button id="mobile-menu-btn" class="md:hidden text-rustic-brown focus:outline-none p-2" aria-label="Open Menu" onclick={toggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    {#if menuOpen}
    <div id="mobile-menu" class="md:hidden bg-white border-t border-stone-200 absolute w-full left-0">
        <div class="flex flex-col px-6 py-4 space-y-4 text-center">
            <a href="#shop" class="block py-2 hover:text-rustic-terracotta font-medium uppercase" onclick={toggleMenu}>ΚΑΤΑΣΤΗΜΑ</a>
            <a href="#about" class="block py-2 hover:text-rustic-terracotta font-medium uppercase" onclick={toggleMenu}>Η ΙΣΤΟΡΙΑ ΜΑΣ</a>
            <a href="#contact" class="block py-2 hover:text-rustic-terracotta font-medium uppercase" onclick={toggleMenu}>ΕΠΙΚΟΙΝΩΝΙΑ</a>
        </div>
    </div>
    {/if}
</nav>

