export interface Product {
	id: string;
	name: string;
	price: number;
	image: string;
}

class CartState {
	items = $state<Product[]>([]);
    notification = $state<{ message: string; visible: boolean }>({ message: '', visible: false });

	add(product: Product) {
		this.items.push(product);
        this.showNotification(`Το ${product.name} προστέθηκε.`);
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

export const cart = new CartState();
