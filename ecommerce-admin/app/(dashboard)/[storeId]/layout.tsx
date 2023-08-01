import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) redirect("/");

  return (
    // <>
    //   <Navbar />
    //   {children}
    // </>
    <div className="h-full relative">
      <div className="hidden h-full xl:w-72 xl:flex xl:flex-col xl:fixed xl:inset-y-0 z-[80]">
        <Sidebar />
      </div>
      <main className="xl:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
