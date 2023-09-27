import CategoriesContainer from "@/components/Admin/CategoriesContainer";
import UsersContainer from "@/components/Admin/UsersContainer";
import WelcomeContainer from "@/components/Admin/WelcomeContainer";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  const session = await getAuthSession();
  return (
    <div className="grid gap-4 py-12">
      <div>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "self-start -mt-20"
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Home
        </Link>
      </div>
      <div className="grid lg:grid-cols-3 w-full gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <WelcomeContainer user={session?.user} />
          {/* @ts-expect-error server component */}
          <CategoriesContainer />
        </div>
        {/* @ts-expect-error server component */}
        <UsersContainer />
      </div>
    </div>
  );
};

export default Page;
