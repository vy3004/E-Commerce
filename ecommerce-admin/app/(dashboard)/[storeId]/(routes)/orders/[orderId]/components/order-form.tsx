"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { Order, OrderItem, Product, Size } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { AlertModal } from "@/components/modals/alert-modal";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

import { formatter } from "@/lib/utils";

interface OrderFormProps {
  initialData:
    | (Order & {
        orderItems: OrderItem[];
      })
    | null;
  products: Product[];
}

const formSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
  totalPrice: z.coerce.number().min(1),
  isPaid: z.boolean().default(false).optional(),
  paymentMethod: z.string().min(1),
  status: z.string().min(1),
  orderItems: z.object({ id: z.string() }).array(),
});

type OrderFormValues = z.infer<typeof formSchema>;

const paymentMethods = [
  "Payment on delivery",
  "Bank Transfer",
  "Credit Card",
  "PayPal",
];

const statuses = ["Pending", "Delivery", "Completed", "Canceled"];

export const OrderForm: React.FC<OrderFormProps> = ({
  initialData,
  products,
}) => {
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      totalPrice: parseFloat(
        String(
          initialData?.orderItems.reduce((total, item) => {
            return total + Number(item.salePrice);
          }, 0)
        )
      ),
    },
  });

  const onSubmit = async (data: OrderFormValues) => {
    console.log(data);
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/orders/${params.orderId}`,
          data
        );
      }
      router.refresh();
      router.push(`/${params.storeId}/orders`);
      toast.success("Order updated!");
    } catch (error) {
      toast.error("Some thing went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Heading title="Edit order" description="Edit an order" />

      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-2 lg:col-span-1 grid lg:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2 lg:col-span-1">
                    <FormLabel>Customer Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Customer name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="col-span-2 lg:col-span-1">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2 lg:col-span-1 space-y-4">
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a payment method"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {paymentMethods.map((paymentMethod, index) => (
                            <SelectItem key={index} value={paymentMethod}>
                              {paymentMethod}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isPaid"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          // @ts-ignore
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Paid</FormLabel>
                        <FormDescription>Order has been paid</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-2 lg:col-span-1 space-y-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a status"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statuses.map((status, index) => (
                            <SelectItem key={index} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <FormLabel>Order Items</FormLabel>
              <div>
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between border rounded-md my-4"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative h-20 w-20 rounded-md overflow-hidden">
                        <Image
                          fill
                          src={product.mainImage}
                          alt=""
                          sizes={"80"}
                          placeholder="empty"
                          className="object-cover object-center"
                        />
                      </div>
                      <span className="font-bold">
                        {product.name} x{" "}
                        {
                          initialData?.orderItems.filter(
                            ({ productId }) => productId === product.id
                          ).length
                        }
                      </span>
                    </div>

                    <span className="text-red-500 mr-4">
                      {formatter.format(
                        Number(
                          initialData &&
                            initialData.orderItems.filter(
                              ({ productId }) => productId === product.id
                            ).length * product.price
                        )
                      )}
                    </span>
                  </div>
                ))}
                <Separator />
                <div className="flex items-center justify-between font-extrabold text-lg mt-4">
                  <span>Total Price</span>
                  <span className="text-red-500 mr-4">
                    {formatter.format(
                      Number(
                        initialData?.orderItems.reduce((total, item) => {
                          return total + Number(item.salePrice);
                        }, 0)
                      )
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};
