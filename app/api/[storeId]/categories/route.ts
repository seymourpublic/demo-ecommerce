// Import the necessary modules and libraries
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
 
// Handler for the POST request to create a new category
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Get the authenticated user's ID from the request
    const { userId } = auth();

    // Get the request body data as JSON
    const body = await req.json();
    const { name, billboardId } = body;

    // Check if the user is authenticated
    if (!userId) {
      // If not authenticated, return a 403 Forbidden response
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // Check if the name and billboardId properties are provided in the request body
    if (!name) {
      // If name is missing, return a 400 Bad Request response
      return new NextResponse("Name is required", { status: 400 });
    }
    
    if (!billboardId) {
      // If billboardId is missing, return a 400 Bad Request response
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    // Check if the storeId parameter is provided in the request
    if (!params.storeId) {
      // If storeId is missing, return a 400 Bad Request response
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Find the store associated with the storeId and the authenticated user's ID
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    // If the user is not the owner of the store, return a 405 Method Not Allowed response
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    // Create a new category in the database
    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      }
    });

    // Return the created category data in JSON format
    return NextResponse.json(category);
  } catch (error) {
    // If any error occurs during the process, log the error and return a 500 Internal Server Error response
    console.log('[CATEGORIES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// Handler for the GET request to fetch all categories for a specific store
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Check if the storeId parameter is provided in the request
    if (!params.storeId) {
      // If storeId is missing, return a 400 Bad Request response
      return new NextResponse("Store id is required", { status: 400 });
    }

    // Fetch all categories associated with the specified storeId from the database
    const categories = await prismadb.category.findMany({
      where: {
        storeId: params.storeId
      }
    });

    // Return the fetched categories data in JSON format
    return NextResponse.json(categories);
  } catch (error) {
    // If any error occurs during the process, log the error and return a 500 Internal Server Error response
    console.log('[CATEGORIES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
