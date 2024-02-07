"use client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { DeletePostRequest } from "@/lib/validators/post";
import { ExtendedPost } from "@/types/db";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertDialog";
import { buttonVariants } from "../ui/Button";

interface DeletePostProps {
  post: ExtendedPost;
}

const DeletePost: FC<DeletePostProps> = ({ post }) => {
  const router = useRouter();
  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: async ({ id, mainImageUrl, images }: DeletePostRequest) => {
      const payload: DeletePostRequest = {
        id,
        mainImageUrl,
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
      router.push("/admin/posts");
      return toast({
        description: "Post was removed successfully.",
      });
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {isPending ? (
          <div>
            <Loader2 className="w-8 h-8 my-4 animate-spin" />
          </div>
        ) : (
          <div
            className={cn(
              buttonVariants({ variant: "destructive", size: "xs" }),
              "text-destructive underline hover:bg-transparent"
            )}
          >
            Delete Post
          </div>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            category and all the posts associated to it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              deletePost({
                id: post.id,
                mainImageUrl: post.mainImageUrl,
                images: post.images,
              })
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePost;
