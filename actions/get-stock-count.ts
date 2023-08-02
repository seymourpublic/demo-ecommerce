// Import the Prismadb library from "@/lib/prismadb"
import prismadb from "@/lib/prismadb";

/**
 * Fetches the total stock count for a specific store from the database.
 *
 * @param storeId - The ID of the store for which to fetch the stock count.
 * @returns A promise that resolves to the total number of active products in stock for the store.
 */
export const getStockCount = async (storeId: string) => {
  // Fetch the count of active products in stock for the given store from the database
  const stockCount = await prismadb.product.count({
    where: {
      storeId,
      isArchived: false,
    }
  });

  return stockCount;
};
