import { ExtendedPost } from "@/types/db";
import Image from "next/image";
import { FC } from "react";
import { AspectRatio } from "../ui/AspectRatio";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Separator } from "../ui/Separator";

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
        <div className="grid gap-4">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="file" />
            <Button type="submit">Change</Button>
          </div>
          <div className="w-[450px]">
            <AspectRatio ratio={16 / 9}>
              <Image
                src={post.mainImageUrl}
                alt={post.title}
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>
        </div>
      </div>
      {post.images.length > 0 && (
        <>
          <Separator className="my-10" />
          <div>
            <h2 className="scroll-m-20 border-b pb-2 mb-4 font-semibold tracking-tight transition-colors first:mt-0">
              Other Images:
            </h2>
            <div className="grid gap-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="file" />
                <Button type="submit">Add</Button>
              </div>
              <div className="w-[450px]">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={post.mainImageUrl}
                    alt={post.title}
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostImages;
