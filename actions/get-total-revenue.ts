// Import the Prismadb library from "@/lib/prismadb"
import prismadb from "@/lib/prismadb";

/**
 * Fetches the total revenue for a specific store from the database.
 *
 * @param storeId - The ID of the store for which to fetch the total revenue.
 * @returns A promise that resolves to the total revenue earned by the store.
 */
export const getTotalRevenue = async (storeId: string) => {
  // Fetch paid orders for the given store from the database
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    }
  });

  // Calculate the total revenue earned by the store
  const totalRevenue = paidOrders.reduce((total, order) => {
    // Calculate the total revenue for each order
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber();
    }, 0);

    // Add the revenue for this order to the total revenue
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
