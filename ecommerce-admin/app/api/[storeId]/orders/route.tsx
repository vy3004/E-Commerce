import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();
    const { firstName, lastName, phone, address, items } = body;

    if (!firstName) {
      return new Response("First name is required", { status: 400 });
    }

    if (!lastName) {
      return new Response("Last name is required", { status: 400 });
    }

    if (!phone) {
      return new Response("Phone number id is required", { status: 400 });
    }

    if (!address) {
      return new Response("Address id is required", { status: 400 });
    }

    if (!items || !items.length) {
      return new Response("Items is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        id: {
          in: items.map((product: { id: string }) => product.id),
        },
      },
    });

    if (!params.storeId) {
      return new Response("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    if (!storeByUserId) {
      return new Response("Unauthorized", { status: 403 });
    }

    const order = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        name: firstName + " " + lastName,
        phone,
        address,
        isPaid: false,
        paymentMethod: "Payment on delivery",
        status: "Pending",
        orderItems: {
          create: items.map((product: { id: string }) => ({
            product: {
              connect: {
                id: product.id,
              },
            },
            salePrice: products
              .find(({ id }) => id === product.id)
              ?.price.toString(),
          })),
        },
      },
    });

    return NextResponse.json(order, {
      headers: corsHeaders,
    });
  } catch (error) {
    console.log("ORDER_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
