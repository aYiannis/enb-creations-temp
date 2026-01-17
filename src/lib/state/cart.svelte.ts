import type { Product } from '$lib/data/products';

class CartState {
	items = $state<Product[]>([]);
	notification = $state<{ message: string; visible: boolean }>({ message: '', visible: false });

	add(product: Product) {
		this.items.push(product);
		this.showNotification(`Το ${product.name} προστέθηκε.`);
	}

	remove(index: number) {
		this.items.splice(index, 1);
	}

	clear() {
		this.items = [];
	}

	showNotification(msg: string) {
		this.notification = { message: msg, visible: true };
		setTimeout(() => {
			this.notification.visible = false;
		}, 3000);
	}

	get count() {
		return this.items.length;
	}

	get total() {
		return this.items.reduce((sum, item) => sum + item.price, 0);
	}
}

export const cartState = new CartState();
