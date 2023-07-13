"use client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { DeletePostRequest } from "@/lib/validators/post";
import { ExtendedPost } from "@/types/db";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button, buttonVariants } from "../ui/Button";
import { TableCell } from "../ui/Table";

interface PostRowProps {
  post: ExtendedPost;
}

const PostRow: FC<PostRowProps> = ({ post }) => {
  const router = useRouter();
  const { mutate: deletePost, isLoading } = useMutation({
    mutationFn: async ({ id, mainImageKey, images }: DeletePostRequest) => {
      const payload: DeletePostRequest = {
        id,
        mainImageKey,
        images,
      };
      const { data } = await axios.patch("/api/post/delete", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong",
        description: "Post wasn't removed successfully, please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      return toast({
        description: "Post was removed successfully.",
      });
    },
  });
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
