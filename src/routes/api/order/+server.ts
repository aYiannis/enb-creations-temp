import { json } from '@sveltejs/kit';
import { convex } from '$lib/server/convex';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const { customerInfo, items, totalAmount } = data;

    // Call the Convex mutation
    // We use "orders:create" as the mutation path. 
    // Ensure the args match the validation in enb-creations-admin/convex/orders.ts
    const orderId = await convex.mutation("orders:create", {
      customerInfo,
      items,
      totalAmount
    });

    return json({ success: true, orderId });
  } catch (error) {
    console.error('Error creating order:', error);
    return json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
};
