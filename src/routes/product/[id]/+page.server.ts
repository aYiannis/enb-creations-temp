import { error } from '@sveltejs/kit';
import { convex } from '$lib/server/convex';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    try {
        const product = await convex.query("inventory:getItem", { id: params.id });

        if (!product) {
            error(404, 'Product not found');
        }

        return {
            product: {
                id: product._id,
                name: product.itemName,
                price: product.price,
                image: product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : '',
                description: product.description
            }
        };
    } catch (e) {
        console.error("Error loading product:", e);
        error(404, 'Product not found or invalid ID');
    }
};
