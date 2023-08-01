import prismadb from "@/lib/prismadb";
import { format } from "date-fns";

import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    paymentMethod: item.paymentMethod,
    status: item.status,
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.salePrice);
      }, 0)
    ),
    createdAt: format(item.createdAt, "MM/dd/yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
