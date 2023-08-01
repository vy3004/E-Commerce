import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    if (!params.orderId) {
      return new NextResponse("Order Id is required", { status: 400 });
    }

    const order = await prismadb.order.findUnique({
      where: {
        id: params.orderId,
      },
      include: {
        orderItems: true,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("ORDER_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; orderId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();
    const { name, phone, address, isPaid, paymentMethod, status } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new Response("Name is required", { status: 400 });
    }

    if (!phone) {
      return new Response("Phone number is required", { status: 400 });
    }

    if (!address) {
      return new Response("Address is required", { status: 400 });
    }

    if (!paymentMethod) {
      return new Response("Payment method is required", { status: 400 });
    }

    if (!status) {
      return new Response("Status is required", { status: 400 });
    }

    if (!params.orderId) {
      return new NextResponse("Order id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new Response("Unauthorized", { status: 403 });
    }

    const order = await prismadb.order.update({
      where: {
        id: params.orderId,
      },
      data: {
        name,
        phone,
        address,
        isPaid,
        paymentMethod,
        status,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("ORDER_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
