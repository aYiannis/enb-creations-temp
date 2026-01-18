import { convex } from '$lib/server/convex';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    // "inventory:listItems" returns items with imageUrls populated
    const items = await convex.query("inventory:listItems");

    // Map to Product interface
    const products = items.map((item: any) => ({
        id: item._id,
        name: item.itemName,
        price: item.price,
        image: item.imageUrls && item.imageUrls.length > 0 ? item.imageUrls[0] : '', // Fallback or placeholder
        description: item.description
    }));

    return {
        products
    };
};
