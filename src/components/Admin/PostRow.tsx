"use client";
import { cn } from "@/lib/utils";
import type { ExtendedPost } from "@/types/db";
import Link from "next/link";
import type { FC } from "react";
import { buttonVariants } from "../ui/Button";
import { TableCell } from "../ui/Table";

interface PostRowProps {
  post: ExtendedPost;
}

const PostRow: FC<PostRowProps> = ({ post }) => {
  return (
    <>
      <TableCell>{post.title}</TableCell>
      <TableCell className="hidden lg:table-cell">{post.type}</TableCell>
      <TableCell className="hidden lg:table-cell">{post.client}</TableCell>
      <TableCell className="hidden lg:table-cell">Teste</TableCell>
      <TableCell className="hidden lg:table-cell">
        {post.category.title}
      </TableCell>
      <TableCell className="text-right space-x-2">
        <Link
          href={`/admin/posts/${post.name}`}
          className={cn(buttonVariants({ variant: "subtle" }))}
        >
          Edit
        </Link>
      </TableCell>
    </>
  );
};

export default PostRow;
