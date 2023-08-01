import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
      status: "completed",
    },
    include: {
      orderItems: true,
    },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + Number(item.salePrice);
    }, 0);
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
