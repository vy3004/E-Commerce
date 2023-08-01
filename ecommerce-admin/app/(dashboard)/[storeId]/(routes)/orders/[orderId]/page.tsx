import prismadb from "@/lib/prismadb";

import { OrderForm } from "./components/order-form";

const OrderPage = async ({
  params,
}: {
  params: { storeId: string; orderId: string };
}) => {
  const order = await prismadb.order.findUnique({
    where: {
      id: params.orderId,
    },
    include: {
      orderItems: true,
    },
  });

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: order?.orderItems.map(
          (product: { productId: string }) => product.productId
        ),
      },
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderForm initialData={order} products={products} />
      </div>
    </div>
  );
};

export default OrderPage;
