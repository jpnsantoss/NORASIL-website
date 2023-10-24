"use client";
import { Category } from "@prisma/client";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
          className="rounded-md object-cover transition opacity-0 duration-300 object-center  group-hover:scale-105 ease-in-out "
          onLoadingComplete={(image) => image.classList.remove("opacity-0")}
        />
        <Link
          href={`/portfolio?category=${category.name}`}
          className="absolute w-full h-full flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out"
        >
          <ExternalLink className="text-primary w-8 h-8" />
        </Link>
      </AspectRatio>
    </TabsContent>
  );
};

export default InterventionImages;
