<script lang="ts">
	import Instagram from '$lib/components/Images/Instagram.svelte';
	import Facebook from '$lib/components/Images/Facebook.svelte';
</script>

<footer
	id="contact"
	class="bg-rustic-brown text-stone-300 py-16 border-t-[6px] border-rustic-terracotta"
>
	<div
		class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left"
	>
		<!-- Brand -->
		<div>
			<h3 class="font-serif text-3xl text-white mb-6 uppercase tracking-wide">E&B CREATIONS</h3>
			<p class="text-stone-400 mb-6">
				Χειροποίητα αγαθά περιορισμένης παραγωγής. Φτιαγμένα με πρόθεση για τον τρόπο ζωής σας.
			</p>
		</div>

		<!-- Links -->
		<div class="flex flex-col space-y-4">
			<h4 class="text-white font-bold tracking-widest text-sm">ΕΞΕΡΕΥΝΗΣΗ</h4>
			<a href="#shop" class="hover:text-rustic-terracotta transition">Συλλογή</a>
			<a href="#about" class="hover:text-rustic-terracotta transition">Η Ιστορία μας</a>
			<a href={'#'} class="hover:text-rustic-terracotta transition">Αποστολές & Επιστροφές</a>
			<a href={'#'} class="hover:text-rustic-terracotta transition">Οδηγός Φροντίδας</a>
		</div>

		<!-- Social -->
		<div class="flex flex-col items-center md:items-start">
			<h4 class="text-white font-bold tracking-widest text-sm mb-4">ΑΚΟΛΟΥΘΗΣΤΕ ΜΑΣ</h4>
			<div class="flex space-x-6">
				<a
					href="https://instagram.com/enb-creations"
					class="bg-stone-700 p-3 rounded-full hover:bg-rustic-terracotta transition duration-300"
					aria-label="Επισκεφθείτε μας στο Instagram"
				>
					<div class="h-5 w-5 fill-white">
						<Instagram />
					</div>
				</a>
				<a
					href="https://facebook.com/enb-creations"
					class="bg-stone-700 p-3 rounded-full hover:bg-rustic-terracotta transition duration-300"
					aria-label="Επισκεφθείτε μας στο Facebook"
				>
					<div class="h-5 w-5 fill-white">
						<Facebook />
					</div>
				</a>
			</div>
		</div>
	</div>

	<div
		class="container mx-auto px-6 pt-8 mt-8 border-t border-stone-800 text-center text-xs text-stone-500"
	>
		&copy; 2026 E&B CREATIONS. Με επιφύλαξη παντός δικαιώματος.
	</div>
</footer>
