import CategoriesContainer from "@/components/Admin/CategoriesContainer";
import CounterContainer from "@/components/Admin/CounterContainer";
import UsersContainer from "@/components/Admin/UsersContainer";
import WelcomeContainer from "@/components/Admin/WelcomeContainer";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

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
          <Suspense
            fallback={
              <div className="w-full flex justify-center py-32">
                <Loader2 className="animate-spin w-12 h-12 text-center" />
              </div>
            }
          >
            {/* @ts-expect-error server component */}
            <CategoriesContainer />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <div className="w-full flex justify-center py-32">
              <Loader2 className="animate-spin w-12 h-12 text-center" />
            </div>
          }
        >
          <div className="space-y-4">
            {/* @ts-expect-error server component */}
            <CounterContainer />
            {/* @ts-expect-error server component */}
            <UsersContainer />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
