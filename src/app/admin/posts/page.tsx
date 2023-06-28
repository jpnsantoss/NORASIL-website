import PostsForm from "@/components/Admin/PostsForm";
import PostsList from "@/components/Admin/PostsList";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="grid gap-4">
      <div>
        <Link
          href="/admin"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "self-start -mt-20"
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Dashboard
        </Link>
      </div>
      <PostsForm />
      <PostsList />
    </div>
  );
};

export default page;
