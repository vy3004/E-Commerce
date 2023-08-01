"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { redirect, useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useCart from "@/hooks/use-cart";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import Currency from "@/components/ui/currency";

import { formSchema } from "./constants";

export const revalidate = 0;

const CheckoutPage = () => {
  const params = useParams();
  const router = useRouter();

  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [isMounted, setIsMounted] = useState(false);

  const uniqueItems = Array.from(items).filter(
    (item, index) => index === items.findIndex((o) => item.id === o.id)
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      items: items,
    },
  });

  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    setIsMounted(true);
    if (!items || !items.length) redirect("/cart");
  }, [items]);

  if (!isMounted) {
    return null;
  }

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    console.log("Data", value);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, value);
      removeAll();
      router.push("/cart");
      toast.success("Order Success!");
    } catch (error) {
      toast.error("Some thing went wrong!");
    } finally {
    }
  };

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">
            Checkout Information
          </h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              <Form {...form}>
                <form className="w-full p-4 px-3 md:px-6 rounded-lg border focus-within:shadow-sm grid grid-cols-12 gap-2">
                  <FormField
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="col-span-12 lg:col-span-6">
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input disabled={isLoading} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="col-span-12 lg:col-span-6">
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input disabled={isLoading} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <Input disabled={isLoading} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="address"
                    render={({ field }) => (
                      <FormItem className="col-span-12">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input disabled={isLoading} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
            <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
              <h2 className="text-lg font-bold text-gray-900 text-center pb-2">
                Order Payment
              </h2>
              <div className="bg-white p-4 font-semibold rounded-lg">
                <div className="flex items-center justify-between font-bold border-b border-gray-200 pb-4 mb-4">
                  <span>Product</span>
                  <span>Price</span>
                </div>

                {uniqueItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <span>
                      {item.name} x{" "}
                      {items.filter(({ id }) => id === item.id).length}
                    </span>

                    <span className="text-gray-500">
                      <Currency
                        value={
                          items.filter(({ id }) => id === item.id).length *
                          parseFloat(item.price)
                        }
                      />
                    </span>
                  </div>
                ))}

                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-lg font-bold">
                    <div>Order total</div>
                    <div className="text-red-500">
                      <Currency value={totalPrice} />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={form.handleSubmit(onSubmit)}
                disabled={isLoading}
                className="w-full mt-6"
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;
