// Import the Prismadb library from "@/lib/prismadb"
import prismadb from "@/lib/prismadb";

/**
 * Fetches the total sales count for a specific store from the database.
 *
 * @param storeId - The ID of the store for which to fetch the sales count.
 * @returns A promise that resolves to the total number of sales for the store.
 */
export const getSalesCount = async (storeId: string) => {
  // Fetch the count of paid orders for the given store from the database
  const salesCount = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true
    },
  });

  return salesCount;
};
