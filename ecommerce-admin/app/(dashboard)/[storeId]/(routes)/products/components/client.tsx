"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { ProductColumn, columns } from "./columns";

interface ProductClientProps {
  data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />
        <Button
          className="md:mt-0 mt-4"
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />

      <Heading title="API" description="API calls for products" />
      <Separator />
      <ApiList entityName="products" entityId="productId" />
    </>
  );
};
