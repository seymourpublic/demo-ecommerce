// Import necessary modules and libraries
import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

// CORS headers to allow cross-origin requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handler for the OPTIONS request to handle pre-flight CORS requests
export async function OPTIONS() {
  // Respond with an empty JSON object and the CORS headers
  return NextResponse.json({}, { headers: corsHeaders });
}

// Handler for the POST request to create a new checkout session
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  // Extract the productIds array from the request body
  const { productIds } = await req.json();

  // Check if productIds are provided in the request body
  if (!productIds || productIds.length === 0) {
    // If productIds are missing or empty, return a 400 Bad Request response
    return new NextResponse("Product ids are required", { status: 400 });
  }

  // Fetch products associated with the given productIds from the database
  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });

  // Create an array of line items for the Stripe checkout session
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  // Iterate through the products and add them as line items
  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'ZAR',
        product_data: {
          name: product.name,
        },
        unit_amount: product.price.toNumber() * 100
      }
    });
  });

  // Create a new order in the database with the specified productIds
  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId
            }
          }
        }))
      }
    }
  });

  // Create a new checkout session with the line items and other configurations
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    billing_address_collection: 'required',
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
    metadata: {
      orderId: order.id
    },
  });

  // Return the session URL as JSON with the CORS headers
  return NextResponse.json({ url: session.url }, {
    headers: corsHeaders
  });
};
