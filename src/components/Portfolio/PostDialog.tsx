import { ExtendedPost } from "@/types/db";
import { Image } from "@prisma/client";
import { FC } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";

interface PostDialogProps {
  images: Image[];
  post: ExtendedPost;
}

const PostDialog: FC<PostDialogProps> = ({ images, post }) => {
  return (
    <DialogContent className="max-w-7xl">
      <DialogHeader>
        <DialogTitle>{post.title}</DialogTitle>
        <DialogDescription>
          This is the set of images associated with this post.
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-2">
        <div className="w-full">Teste</div>
        <div className="w-full">teste</div>
      </div>
    </DialogContent>
  );
};

export default PostDialog;
