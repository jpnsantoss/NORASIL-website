"use client";
import { Post } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";

interface PortfolioImageProps {
  post: Post;
}

const PortfolioImage: FC<PortfolioImageProps> = ({ post }) => {
  return (
    <div className="h-[25vh] lg:h-full relative bg-lightGray shadow rounded-lg overflow-hidden group">
      <Image
        src={post.mainImageUrl}
        alt={post.title}
        fill
        loading="lazy"
        className="rounded-md object-cover transition opacity-0 duration-500 object-center  group-hover:scale-105 ease-in-out "
        onLoadingComplete={(image) => image.classList.remove("opacity-0")}
      />
    </div>
  );
};

export default PortfolioImage;
