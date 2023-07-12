import PostsForm from "@/components/Admin/PostsForm";
import PostsList from "@/components/Admin/PostsList";
import { buttonVariants } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Command, CommandInput } from "@/components/ui/Command";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
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
      <Card>
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>
            Create here posts to be displayed in the portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Posts Form Component */}
          <PostsForm categories={categories} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <CardTitle>Posts List</CardTitle>
              <CardDescription>List of created posts.</CardDescription>
            </div>
            <Command className="rounded-lg border shadow-md">
              <CommandInput placeholder="Search for a build..." />
            </Command>
          </div>
        </CardHeader>
        <CardContent>
          <PostsList />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
