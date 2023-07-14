import EditPost from "@/components/Admin/EditPost";
import PostImages from "@/components/Admin/PostImages";
import { buttonVariants } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    name: string;
  };
}

const Page = async ({ params }: pageProps) => {
  const { name } = params;
  const decodedName = decodeURIComponent(name);

  console.log(decodedName);

  const post = await db.post.findFirst({
    where: { name: decodedName },
    include: {
      category: true,
      images: true,
    },
  });

  const categories = await db.category.findMany();

  if (!post) return notFound();

  return (
    <div className="grid gap-4">
      <div>
        <Link
          href="/admin/posts"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "self-start -mt-20"
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Posts
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Post: {post.title}</CardTitle>
          <CardDescription>
            Changes applied in this page will automatically be updated in the
            portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Posts Form Component */}
          <EditPost categories={categories} post={post} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
          <CardDescription>
            Changes applied in this page will automatically be updated in the
            portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Posts Form Component */}
          <PostImages post={post} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
