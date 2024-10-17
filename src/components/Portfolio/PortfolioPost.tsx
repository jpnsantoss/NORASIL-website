import { cn } from "@/lib/utils";
import type { ExtendedPost } from "@/types/db";
import Link from "next/link";
import type { FC } from "react";
import { buttonVariants } from "../ui/Button";
import PortfolioImage from "./PortfolioImage";

interface PortfolioPostProps {
  post: ExtendedPost;
}

const PortfolioPost: FC<PortfolioPostProps> = ({ post }) => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 px-4 lg:max-h-96">
      <PortfolioImage post={post} />
      <div className="h-full flex flex-col lg:justify-between">
        <div className="space-y-4">
          <h1 className="text-3xl lg:text-5xl font-bold text-ellipsis">
            {post.title.length > 64
              ? `${post.title.substring(0, 64)}...`
              : post.title}
          </h1>
          <h2 className="text-darkGray text-2xl">#{post.category.title}</h2>
        </div>
        <Link
          href={`/obras/${post.name}`}
          className={cn(
            buttonVariants({ variant: "link" }),
            "text-primary p-0 text-2xl font-bold w-fit",
          )}
        >
          Ver mais
        </Link>
      </div>
    </div>
  );
};

export default PortfolioPost;
