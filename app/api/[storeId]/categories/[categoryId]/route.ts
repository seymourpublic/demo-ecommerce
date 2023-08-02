// Import the necessary modules and libraries
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

// Handler for the GET request
export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    // Check if the categoryId parameter is provided
    if (!params.categoryId) {
      // If categoryId is missing, return a 400 Bad Request response
      return new NextResponse("Category id is required", { status: 400 });
    }

    // Fetch the category data from the database using the provided categoryId
    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId
      },
      include: {
        billboard: true
      }
    });

    // Return the category data in JSON format
    return NextResponse.json(category);
  } catch (error) {
    // If any error occurs during the process, log the error and return a 500 Internal Server Error response
    console.log('[CATEGORY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// Handler for the DELETE request
export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string, storeId: string } }
) {
  try {
    // Get the authenticated user's ID from the request
    const { userId } = auth();

    // Check if the user is authenticated
    if (!userId) {
      // If not authenticated, return a 403 Forbidden response
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // Check if the categoryId and storeId parameters are provided
    if (!params.categoryId || !params.storeId) {
      // If categoryId or storeId is missing, return a 400 Bad Request response
      return new NextResponse("Category id and store id are required", { status: 400 });
    }

    // Find the store associated with the categoryId and the authenticated user's ID
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

    // Delete the category from the database using the provided categoryId
    const category = await prismadb.category.delete({
      where: {
        id: params.categoryId,
      }
    });

    // Return the deleted category data in JSON format
    return NextResponse.json(category);
  } catch (error) {
    // If any error occurs during the process, log the error and return a 500 Internal Server Error response
    console.log('[CATEGORY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// Handler for the PATCH request
export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string, storeId: string } }
) {
  try {   
    // Get the authenticated user's ID from the request
    const { userId } = auth();

    // Get the request body data as JSON
    const body = await req.json();
    
    // Destructure the name and billboardId properties from the request body
    const { name, billboardId } = body;
    
    // Check if the user is authenticated
    if (!userId) {
      // If not authenticated, return a 403 Forbidden response
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // Check if the name, billboardId, categoryId, and storeId parameters are provided
    if (!name || !billboardId || !params.categoryId || !params.storeId) {
      // If any required parameter is missing, return a 400 Bad Request response
      return new NextResponse("Name, Billboard ID, Category id, and Store id are required", { status: 400 });
    }

    // Find the store associated with the categoryId and the authenticated user's ID
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

    // Update the category data in the database using the provided categoryId
    const category = await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId
      }
    });

    // Return the updated category data in JSON format
    return NextResponse.json(category);
  } catch (error) {
    // If any error occurs during the process, log the error and return a 500 Internal Server Error response
    console.log('[CATEGORY_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
