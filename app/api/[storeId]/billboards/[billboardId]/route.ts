// Import the necessary modules and libraries
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

// Handler for the GET request
export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    // Check if the billboardId parameter is provided
    if (!params.billboardId) {
      // If billboardId is missing, return a 400 Bad Request response
      return new NextResponse("Billboard id is required", { status: 400 });
    }

    // Fetch the billboard data from the database using the provided billboardId
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId
      }
    });

    // Return the billboard data in JSON format
    return NextResponse.json(billboard);
  } catch (error) {
    // If any error occurs during the process, log the error and return a 500 Internal Server Error response
    console.log('[BILLBOARD_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// Handler for the DELETE request
export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string, storeId: string } }
) {
  try {
    // Get the authenticated user's ID from the request
    const { userId } = auth();

    // Check if the user is authenticated
    if (!userId) {
      // If not authenticated, return a 403 Forbidden response
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // Check if the billboardId and storeId parameters are provided
    if (!params.billboardId || !params.storeId) {
      // If billboardId or storeId is missing, return a 400 Bad Request response
      return new NextResponse("Billboard id and store id are required", { status: 400 });
    }

    // Find the store associated with the billboardId and the authenticated user's ID
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

    // Delete the billboard from the database using the provided billboardId
    const billboard = await prismadb.billboard.delete({
      where: {
        id: params.billboardId,
      }
    });

    // Return the deleted billboard data in JSON format
    return NextResponse.json(billboard);
  } catch (error) {
    // If any error occurs during the process, log the error and return a 500 Internal Server Error response
    console.log('[BILLBOARD_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


// Handler for the PATCH request
export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string, storeId: string } }
) {
  try {   
    // Get the authenticated user's ID from the request
    const { userId } = auth();

    // Get the request body data as JSON
    const body = await req.json();
    
    // Destructure the label and imageUrl properties from the request body
    const { label, imageUrl } = body;
    
    // Check if the user is authenticated
    if (!userId) {
      // If not authenticated, return a 403 Forbidden response
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    // Check if the label, imageUrl, billboardId, and storeId parameters are provided
    if (!label || !imageUrl || !params.billboardId || !params.storeId) {
      // If any required parameter is missing, return a 400 Bad Request response
      return new NextResponse("Label, Image URL, Billboard id, and Store id are required", { status: 400 });
    }

    // Find the store associated with the billboardId and the authenticated user's ID
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

    // Update the billboard data in the database using the provided billboardId
    const billboard = await prismadb.billboard.update({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl
      }
    });

    // Return the updated billboard data in JSON format
    return NextResponse.json(billboard);
  } catch (error) {
    // If any error occurs during the process, log the error and return a 500 Internal Server Error response
    console.log('[BILLBOARD_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
