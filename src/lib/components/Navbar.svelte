<script lang="ts">
  import { cartState } from '$lib/state/cart.svelte';
  
  let menuOpen = $state(false);

  function toggleMenu() {
    menuOpen = !menuOpen;
  }
</script>

<nav class="sticky top-0 z-50 bg-rustic-cream/95 backdrop-blur-sm border-b border-stone-200 shadow-sm transition-all duration-300" id="navbar">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
        
        <!-- Logo -->
        <a href="/" class="font-serif text-2xl font-bold tracking-wide text-rustic-brown hover:text-rustic-terracotta transition duration-300 group">
            E&B Creations <span class="text-sm font-sans font-normal text-stone-500 group-hover:text-rustic-terracotta/70 transition">| Χειροποίητα</span>
        </a>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide text-stone-600">
            <a href="#shop" class="hover:text-rustic-terracotta transition duration-300">ΚΑΤΑΣΤΗΜΑ</a>
            <a href="#about" class="hover:text-rustic-terracotta transition duration-300">Η ΙΣΤΟΡΙΑ ΜΑΣ</a>
            <a href="#contact" class="hover:text-rustic-terracotta transition duration-300">ΕΠΙΚΟΙΝΩΝΙΑ</a>
            
            <!-- Cart Icon -->
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="relative group p-2" aria-label="Shopping Cart">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-rustic-brown group-hover:text-rustic-terracotta transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span class="absolute top-0 right-0 bg-rustic-terracotta text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">{cartState.count}</span>
                </div>
                <div tabindex="0" role="menu" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-white shadow-xl border border-stone-100">
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

        <!-- Mobile Menu Button -->
        <button id="mobile-menu-btn" class="md:hidden text-rustic-brown focus:outline-none p-2" aria-label="Open Menu" onclick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
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

