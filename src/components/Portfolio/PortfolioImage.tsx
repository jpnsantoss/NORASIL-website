"use client";
import type { Post } from "@prisma/client";
import Image from "next/image";
import type { FC } from "react";
import { AspectRatio } from "../ui/AspectRatio";

interface PortfolioImageProps {
  post: Post;
}

const PortfolioImage: FC<PortfolioImageProps> = ({ post }) => {
  return (
    <div className="relative">
      <AspectRatio
        ratio={16 / 10}
        className="bg-lightGray shadow group rounded-md overflow-hidden"
      >
        <Image
          src={post.mainImageUrl}
          alt={post.title}
          fill
          className="rounded-md object-cover transition opacity-0 duration-500 object-center  group-hover:scale-105 ease-in-out "
          onLoad={(event) => {
            const image = event.target as HTMLImageElement;
            image.classList.remove("opacity-0");
          }}
        />
      </AspectRatio>
      {/* <Image
        
        fill
        loading="lazy"
        className="rounded-md object-cover transition opacity-0 duration-500 object-center  group-hover:scale-105 ease-in-out "
        
      /> */}
    </div>
  );
};

export default PortfolioImage;
