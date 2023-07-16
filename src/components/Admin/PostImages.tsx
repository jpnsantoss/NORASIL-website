import { ExtendedPost } from "@/types/db";
import { X } from "lucide-react";
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
              <div className="grid grid-cols-3 gap-4">
                {post.images.map((image) => (
                  <div key={post.id} className="w-full relative">
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        src={image.url}
                        alt={post.title}
                        fill
                        className="rounded-md object-cover"
                      />
                    </AspectRatio>
                    <div className="absolute right-0 top-0">
                      <Button
                        size={"xs"}
                        variant={"destructive"}
                        className="bg-black/40"
                      >
                        <X className="w-4 h-4 text-white" />
                      </Button>
                      {/* <div className="bg-destructive p-1 rounded-bl-md">
                        <X className="w-4 h-4 text-white" />
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostImages;
