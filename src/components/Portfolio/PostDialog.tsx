"use client";
import { cn } from "@/lib/utils";
import { ExtendedPost } from "@/types/db";
import { Image as PrismaImage } from "@prisma/client";
import Image from "next/image";
import { FC, useState } from "react";
import { AspectRatio } from "../ui/AspectRatio";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";

interface PostDialogProps {
  images: PrismaImage[];
  post: ExtendedPost;
}

const PostDialog: FC<PostDialogProps> = ({ images, post }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  return (
    <DialogContent className="max-w-[95%] p-4 lg:max-w-screen-2xl">
      <DialogHeader className="hidden lg:block">
        <DialogTitle>{post.title}</DialogTitle>
        <DialogDescription>
          This is the set of images associated with this post.
        </DialogDescription>
      </DialogHeader>
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-16 lg:p-8">
        <div className="w-full lg:col-span-2">
          <div className="rounded-md group overflow-hidden relative w-full h-[60vh] md:h-[60vh] lg:h-[50vh]">
            <Image
              src={selectedImage.url}
              alt={`${post.title} Image ${images[0].id}`}
              fill
              loading="lazy"
              className="object-contain transition opacity-0 duration-500 object-center group-hover:scale-105 ease-in-out"
              onLoadingComplete={(image) => image.classList.remove("opacity-0")}
            />
          </div>
        </div>
        <div className="space-y-4">
          <h2>Select an image:</h2>
          <div className="grid grid-cols-6 md:grid-cols-10 lg:grid-cols-4 w-full gap-4">
            {images.map((image) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className={cn(
                  "bg-lightGray rounded-md group overflow-hidden relative h-10 lg:h-20 focus-visible:border-2 focus-visible:border-primary",
                  image.id == selectedImage.id && "border-2 border-black"
                )}
              >
                <Image
                  src={image.url}
                  alt={`${post.title} Image ${image.id}`}
                  fill
                  loading="lazy"
                  className="rounded-md object-cover transition opacity-0 duration-500 object-center  group-hover:scale-105 ease-in-out "
                  onLoadingComplete={(image) =>
                    image.classList.remove("opacity-0")
                  }
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default PostDialog;
