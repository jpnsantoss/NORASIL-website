import PostsForm from "@/components/Admin/PostsForm";
import PostsList from "@/components/Admin/PostsList";
import PostsSearch from "@/components/PostsSearch";
import { buttonVariants } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { acceleratedDb } from "@/lib/db";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  const categories = await acceleratedDb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    cacheStrategy: { ttl: 60 },
  });

  const posts = await acceleratedDb.post.findMany({
    include: {
      category: true,
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
    cacheStrategy: { ttl: 60 },
  });

  return (
    <div className="grid gap-4 py-12">
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
            <PostsSearch />
          </div>
        </CardHeader>
        <CardContent>
          <PostsList initialPosts={posts} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;