import { cn } from "@/lib/utils";
import { ExtendedPost } from "@/types/db";
import { Category, Post } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "../ui/Button";
import PortfolioImage from "./PortfolioImage";

interface PortfolioPostProps {
  post: ExtendedPost;
}

const PortfolioPost: FC<PortfolioPostProps> = ({ post }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 px-4 lg:h-96">
      <PortfolioImage post={post} />
      <div className="h-full flex flex-col lg:justify-between">
        <div className="space-y-4">
          <h1 className="text-3xl lg:text-5xl font-bold">{post.title}</h1>
          <h2 className="text-darkGray text-2xl">#{post.category.title}</h2>
        </div>
        <Link
          href={`/posts/${post.name}`}
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-primary p-0 text-2xl font-bold w-fit"
          )}
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default PortfolioPost;
