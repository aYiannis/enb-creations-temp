<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import ProductCard from '$lib/components/ProductCard.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import type { Product } from '$lib/state/cart.svelte';

  const products: Product[] = [
    {
      id: '1',
      name: 'Χειροποίητο Μάλλινο Κασκόλ',
      price: 45.00,
      image: 'https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '2',
      name: 'Ρουστίκ Πήλινη Κούπα',
      price: 28.00,
      image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop',
    },
     {
      id: '3',
      name: 'Ξύλο Κοπής Ελιάς',
      price: 55.00,
      image: 'https://images.unsplash.com/photo-1621256334659-150244431e07?q=80&w=800&auto=format&fit=crop',
    },
     {
      id: '4',
      name: 'Σετ Κεριών Μελισσοκέρινου',
      price: 32.00,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '5',
      name: 'Βάζο Τερακότα',
      price: 60.00,
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: '6',
      name: 'Σαπούνι Λεβάντας',
      price: 12.00,
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop',
    },
  ];
</script>

<Navbar />
<Hero />

<!-- ABOUT SECTION -->
<section id="about" class="py-24 bg-white">
    <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row items-center gap-16">
            
            <!-- Image Grid -->
            <div class="w-full md:w-1/2 grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?q=80&w=800&auto=format&fit=crop" 
                        alt="Working with clay" class="rounded-lg shadow-lg w-full h-64 object-cover transform translate-y-8">
                <img src="https://images.unsplash.com/photo-1607513549117-09d587c63c78?q=80&w=800&auto=format&fit=crop" 
                        alt="Knitting wool" class="rounded-lg shadow-lg w-full h-64 object-cover">
            </div>

            <!-- Text -->
            <div class="w-full md:w-1/2">
                <span class="text-rustic-terracotta font-bold tracking-widest text-xs mb-2 block">Η ΙΣΤΟΡΙΑ ΜΑΣ</span>
                <h2 class="font-serif text-4xl md:text-5xl font-bold text-rustic-brown mb-8 leading-tight">
                    Γεια σας, είμαστε οι <br>Ελένη & Βασίλης
                </h2>
                <p class="text-stone-600 leading-relaxed mb-6 text-lg">
                    Το ταξίδι μας ξεκίνησε σε ένα μικρό εξοχικό σπίτι. Πιστεύουμε ότι τα αντικείμενα που βάζετε στο σπίτι σας πρέπει να έχουν ψυχή.
                    Ο Βασίλης ασχολείται με το ξύλο, κατασκευάζοντας ανθεκτικά κομμάτια από ανακυκλωμένη ξυλεία, ενώ η Ελένη γνέθει και πλέκει οργανικό μαλλί σε ζεστά υφάσματα.
                </p>
                <p class="text-stone-600 leading-relaxed mb-8">
                    Κάθε ατέλεια στη δουλειά μας είναι σκόπιμη—μια υπενθύμιση ότι φτιάχτηκε από ανθρώπινα χέρια, όχι από μηχανές.
                    Ευχαριστούμε που στηρίζετε το όνειμά μας.
                </p>
                
                <div class="flex items-center gap-4">
                    <div class="h-px bg-rustic-terracotta w-12"></div>
                    <span class="font-serif italic text-xl text-rustic-brown">Ε & Β</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- SHOP SECTION -->
<section id="shop" class="py-24 bg-rustic-cream relative">
    <!-- Decorative background element -->
    <div class="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-rustic-cream"></div>

    <div class="container mx-auto px-6 relative z-10">
        
        <div class="text-center mb-16 max-w-2xl mx-auto">
            <span class="text-rustic-sage font-bold tracking-widest text-xs mb-2 block">ΤΟ ΚΑΤΑΣΤΗΜΑ</span>
            <h2 class="font-serif text-4xl font-bold text-rustic-brown mb-4">Τρέχουσα Συλλογή</h2>
            <p class="text-stone-500">Περιορισμένη παραγωγή. Όταν εξαντληθούν, δεν θα επαναληφθούν.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {#each products as product}
                <ProductCard {product} />
            {/each}
        </div>
    </div>
</section>

<Footer />
