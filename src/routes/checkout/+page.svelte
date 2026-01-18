<script lang="ts">
  import { cartState } from '$lib/state/cart.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let shippingInfo = $state({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    phone: ''
  });

  async function handleCheckout(e: SubmitEvent) {
    e.preventDefault();
    
    // Aggregate items by ID
    const itemsMap = new Map<string, { inventoryId: string, quantity: number, priceAtPurchase: number, itemName: string }>();
    
    for (const item of cartState.items) {
        if (itemsMap.has(item.id)) {
            itemsMap.get(item.id)!.quantity++;
        } else {
            itemsMap.set(item.id, {
                inventoryId: item.id,
                quantity: 1,
                priceAtPurchase: item.price,
                itemName: item.name
            });
        }
    }
    
    const orderItems = Array.from(itemsMap.values());

    const customerInfo = {
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`.trim(),
        email: shippingInfo.email,
        phone: shippingInfo.phone,
        address: shippingInfo.address,
        city: shippingInfo.city,
        postalCode: shippingInfo.zipCode
    };

    try {
        const response = await fetch('/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerInfo,
                items: orderItems,
                totalAmount: cartState.total
            })
        });

        const result = await response.json();

        if (response.ok && result.success) {
            alert('Η παραγγελία σας καταχωρήθηκε επιτυχώς! Σας ευχαριστούμε.');
            cartState.clear();
            window.location.href = '/';
        } else {
            console.error('Order failed:', result);
            alert('Παρουσιάστηκε πρόβλημα κατά την καταχώρηση της παραγγελίας. Παρακαλούμε δοκιμάστε ξανά.');
        }
    } catch (err) {
        console.error('Checkout error:', err);
        alert('Σφάλμα επικοινωνίας. Παρακαλούμε ελέγξτε τη σύνδεσή σας.');
    }
  }
</script>

<Navbar />

<main class="min-h-screen bg-rustic-cream py-12 md:py-20">
  <div class="container mx-auto px-6 max-w-6xl">
    <h1 class="font-serif text-4xl font-bold text-rustic-brown mb-12 text-center">Ολοκλήρωση Παραγγελίας</h1>

    {#if cartState.items.length === 0}
      <div class="text-center py-20 bg-white rounded-lg shadow-sm border border-stone-100">
        <h2 class="text-2xl text-stone-500 mb-6 font-serif">Το καλάθι σας είναι άδειο</h2>
        <a href="/#shop" class="btn bg-rustic-brown text-white hover:bg-rustic-terracotta border-none px-8">ΕΠΙΣΤΡΟΦΗ ΣΤΟ ΚΑΤΑΣΤΗΜΑ</a>
      </div>
    {:else}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <!-- Checkout Form -->
        <div class="lg:col-span-2 space-y-8">
          <section class="bg-white p-8 rounded-lg shadow-sm border border-stone-100">
            <h2 class="font-serif text-2xl text-rustic-brown mb-6 border-b border-stone-100 pb-4">Στοιχεία Αποστολής</h2>
            <form onsubmit={handleCheckout} class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="form-control w-full">
                <label class="label" for="firstName">
                  <span class="label-text font-semibold text-stone-600">Όνομα</span>
                </label>
                <input type="text" id="firstName" bind:value={shippingInfo.firstName} placeholder="π.χ. Ιωάννης" class="input input-bordered w-full bg-stone-50" required />
              </div>
              
              <div class="form-control w-full">
                <label class="label" for="lastName">
                  <span class="label-text font-semibold text-stone-600">Επώνυμο</span>
                </label>
                <input type="text" id="lastName" bind:value={shippingInfo.lastName} placeholder="π.χ. Παπαδόπουλος" class="input input-bordered w-full bg-stone-50" required />
              </div>

              <div class="form-control w-full md:col-span-2">
                <label class="label" for="email">
                  <span class="label-text font-semibold text-stone-600">Email</span>
                </label>
                <input type="email" id="email" bind:value={shippingInfo.email} placeholder="john@example.com" class="input input-bordered w-full bg-stone-50" required />
              </div>

              <div class="form-control w-full md:col-span-2">
                <label class="label" for="address">
                  <span class="label-text font-semibold text-stone-600">Διεύθυνση</span>
                </label>
                <input type="text" id="address" bind:value={shippingInfo.address} placeholder="Οδός και αριθμός" class="input input-bordered w-full bg-stone-50" required />
              </div>

              <div class="form-control w-full">
                <label class="label" for="city">
                  <span class="label-text font-semibold text-stone-600">Πόλη</span>
                </label>
                <input type="text" id="city" bind:value={shippingInfo.city} placeholder="π.χ. Αθήνα" class="input input-bordered w-full bg-stone-50" required />
              </div>

              <div class="form-control w-full">
                <label class="label" for="zipCode">
                  <span class="label-text font-semibold text-stone-600">Τ.Κ.</span>
                </label>
                <input type="text" id="zipCode" bind:value={shippingInfo.zipCode} placeholder="12345" class="input input-bordered w-full bg-stone-50" required />
              </div>

              <div class="form-control w-full md:col-span-2">
                <label class="label" for="phone">
                  <span class="label-text font-semibold text-stone-600">Τηλέφωνο</span>
                </label>
                <input type="tel" id="phone" bind:value={shippingInfo.phone} placeholder="69..." class="input input-bordered w-full bg-stone-50" required />
              </div>

              <div class="md:col-span-2 pt-6">
                <button type="submit" class="btn w-full bg-rustic-terracotta text-white hover:bg-rustic-brown border-none py-4 h-auto text-lg tracking-widest font-bold">
                  ΟΛΟΚΛΗΡΩΣΗ ΠΑΡΑΓΓΕΛΙΑΣ
                </button>
              </div>
            </form>
          </section>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <section class="bg-white p-6 rounded-lg shadow-sm border border-stone-100 sticky top-32">
            <h2 class="font-serif text-2xl text-rustic-brown mb-6 border-b border-stone-100 pb-4">Η Παραγγελία σας</h2>
            
            <div class="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
              {#each cartState.items as item, i}
                <div class="flex items-center gap-4 group">
                  <div class="w-16 h-16 flex-shrink-0">
                    <img src={item.image} alt={item.name} class="w-full h-full object-cover rounded shadow-sm" />
                  </div>
                  <div class="flex-grow">
                    <h3 class="text-sm font-semibold text-stone-700">{item.name}</h3>
                    <p class="text-rustic-sage font-bold">€{item.price.toFixed(2)}</p>
                  </div>
                  <button 
                    class="text-stone-300 hover:text-red-400 transition-colors"
                    onclick={() => cartState.remove(i)}
                    aria-label="Αφαίρεση"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              {/each}
            </div>

            <div class="space-y-2 border-t border-stone-100 pt-4">
              <div class="flex justify-between text-stone-500">
                <span>Υποσύνολο</span>
                <span>€{cartState.total.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-stone-500">
                <span>Μεταφορικά</span>
                <span class="text-rustic-sage font-semibold uppercase text-xs">Δωρεάν</span>
              </div>
              <div class="flex justify-between text-xl font-bold text-rustic-brown pt-4 border-t border-stone-50 mt-4">
                <span>Σύνολο</span>
                <span>€{cartState.total.toFixed(2)}</span>
              </div>
            </div>
            
            <p class="text-[10px] text-stone-400 mt-6 text-center italic">
              Η πληρωμή γίνεται με αντικαταβολή κατά την παράδοση.
            </p>
          </section>
        </div>

      </div>
    {/if}
  </div>
</main>

<Footer />

<style>
  /* Custom scrollbar for order summary */
  .overflow-y-auto::-webkit-scrollbar {
    width: 4px;
  }
  .overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
  }
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #e7e5e4;
    border-radius: 10px;
  }
  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #d6d3d1;
  }
</style>
