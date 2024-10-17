import UserAuthForm from "@/components/UserAuthForm";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "self-start -mt-20",
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Home
        </Link>

        <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
          <div className="flex flex-col space-y-4 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-sm max-w-xs mx-auto">
              By continuing, you are setting up a Norasil account and agree to
              our User Agreement and Privacy Policy.
            </p>

            {/* sign in form */}
            <UserAuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
