import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import StoreCombobox from "@/components/store-combobox";
import MobileSidebar from "@/components/mobile-sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const stores = await prismadb.store.findMany({
    where: { userId: userId },
  });

  return (
    <div className="border-b">
      <div className="h-16 px-4 flex items-center">
        <div className="space-x-4 flex items-center">
          <MobileSidebar />
          <StoreCombobox items={stores} />
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />

          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
