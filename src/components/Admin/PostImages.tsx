import type { ExtendedPost } from "@/types/db";
import type { FC } from "react";
import { Separator } from "../ui/Separator";
import PostImagesForm from "./PostImagesForm";
import PostMainImageForm from "./PostMainImageForm";

interface PostImagesProps {
  post: ExtendedPost;
}

const PostImages: FC<PostImagesProps> = ({ post }) => {
  return (
    <div>
      <div>
        <h2 className="scroll-m-20 border-b pb-2 mb-4 font-semibold tracking-tight transition-colors first:mt-0">
          Main Image:
        </h2>
        <PostMainImageForm post={post} />
      </div>
      <>
        <Separator className="my-10" />
        <div>
          <h2 className="scroll-m-20 border-b pb-2 mb-4 font-semibold tracking-tight transition-colors first:mt-0">
            Other Images:
          </h2>
          <PostImagesForm post={post} />
        </div>
      </>
    </div>
  );
};

export default PostImages;
