import db from "@/lib/db";
import { cn } from "@/lib/utils";
import Link from "next/link";
import PostCard from "../PostCard";
import { buttonVariants } from "../ui/Button";

import { ExtendedPost } from "@/types/db";

interface SimilarPostsProps {
  post: ExtendedPost;
}

const SimilarPosts = async ({ post }: SimilarPostsProps) => {
  const posts = await db.post.findMany({
    where: {
      categoryId: post.categoryId,
      id: {
        not: post.id,
      },
    },
    take: 3,
    orderBy: {
      date: "desc",
    },
    include: {
      images: true,
      category: true,
    },
    cacheStrategy: { ttl: 60 },
  });
  if (posts.length > 0) {
    return (
      <div className="py-16 lg:pt-32">
        <h1 className="text-5xl font-bold text-center leading-[4.5rem]">
          Obras <span className=" bg-secondary">Semelhantes</span>
        </h1>

        <div className="container lg:px-24 grid lg:grid-cols-3 gap-8 lg:gap-24 py-16 mx-auto">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
        <div className="w-full flex justify-center">
          <Link
            href={`/portfolio?category=${post.category.name}`}
            className={cn(buttonVariants({ size: "lg" }), "shadow-btn")}
          >
            Ver Obras
          </Link>
        </div>
      </div>
    );
  }
};

export default SimilarPosts;
