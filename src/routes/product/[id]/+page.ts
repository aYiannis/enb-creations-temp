import { error } from '@sveltejs/kit';
import { products } from '$lib/data/products';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const product = products.find((p) => p.id === params.id);

	if (!product) {
		error(404, 'Product not found');
	}

	return {
		product
	};
};
