"use client";
import { Category } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import { AspectRatio } from "../ui/AspectRatio";
import { TabsContent } from "../ui/Tabs";

interface InterventionImagesProps {
  category: Category;
}

const InterventionImages: FC<InterventionImagesProps> = ({ category }) => {
  return (
    <TabsContent
      key={category.id}
      value={category.name}
      className="container py-8 px-4 lg:px-48 relative"
    >
      <AspectRatio
        ratio={16 / 9}
        className="bg-lightGray shadow rounded-md group overflow-hidden"
      >
        <Image
          src={category.imageUrl}
          alt={category.title}
          fill
          loading="lazy"
          className="rounded-md object-cover transition opacity-0 duration-500 object-center  group-hover:scale-105 ease-in-out "
          onLoadingComplete={(image) => image.classList.remove("opacity-0")}
        />
      </AspectRatio>
    </TabsContent>
  );
};

export default InterventionImages;
