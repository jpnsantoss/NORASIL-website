"use client";
import { Post } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";

interface PostImageProps {
  post: Post;
}

const PostImage: FC<PostImageProps> = ({ post }) => {
  return (
    <div className="relative w-full h-[60vh] bg-lightGray shadow rounded-xl overflow-hidden group">
      <Image
        src={post.mainImageUrl}
        alt={post.title}
        fill
        loading="lazy"
        className="rounded-md object-cover transition opacity-0 duration-500 object-center  group-hover:scale-105 ease-in-out "
        onLoad={(event) => {
          const image = event.target as HTMLImageElement;
          image.classList.remove("opacity-0");
        }}
      />
    </div>
  );
};

export default PostImage;
