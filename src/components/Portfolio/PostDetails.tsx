"use client";
import { ExtendedPost } from "@/types/db";
import { Image as PrismaImage } from "@prisma/client";
import { format } from "date-fns";
import { Calendar, Clock, Hammer, X } from "lucide-react";
import Image from "next/image";
import { FC, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Download from "yet-another-react-lightbox/plugins/download";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import NextJsImage from "../NextJsImage";
import { Separator } from "../ui/Separator";

interface PostDetailsProps {
  images: PrismaImage[];
  post: ExtendedPost;
}

const PostDetails: FC<PostDetailsProps> = ({ images, post }) => {
  const [showImages, setShowImages] = useState(false);
  const [open, setOpen] = useState(false);
  const thumbnailsRef = useRef(null);

  return (
    <>
      <Lightbox
        open={open}
        plugins={[Counter, Thumbnails, Download]}
        thumbnails={{ ref: thumbnailsRef }}
        counter={{ container: { style: { top: 0, bottom: "unset" } } }}
        close={() => setOpen(false)}
        slides={images.map((image) => ({ src: image.url }))}
        render={{ slide: NextJsImage, thumbnail: NextJsImage }}
      />
      <div className="grid grid-cols-2 gap-8">
        <div className="grid grid-cols-3 gap-2">
          {images.length <= 3 ? (
            images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setOpen(true)}
                className="h-64 relative rounded-xl overflow-hidden group"
              >
                <Image
                  src={image.url}
                  fill
                  alt={`Image n${index}`}
                  className="object-center object-cover group-hover:scale-110 transition ease-in-out duration-300"
                />
              </button>
            ))
          ) : (
            <>
              <div className="h-64 relative rounded-xl overflow-hidden group">
                <Image
                  src={images[0].url}
                  fill
                  alt={`Image n0`}
                  className="object-center object-cover group-hover:scale-110 transition ease-in-out duration-300"
                />
              </div>
              <div className="h-64 relative rounded-xl overflow-hidden group">
                <Image
                  src={images[1].url}
                  fill
                  alt={`Image n0`}
                  className="object-center object-cover group-hover:scale-110 transition ease-in-out duration-300"
                />
              </div>
              <button
                onClick={() => setShowImages((prev) => !prev)}
                className="h-64 relative rounded-xl overflow-hidden group"
              >
                <Image
                  src={images[2].url}
                  fill
                  alt={`Image n0`}
                  className="object-center object-cover group-hover:scale-110 transition ease-in-out duration-300"
                />
                <div className="w-full h-full bg-black opacity-75 absolute top-0 left-0" />
                <div className="w-full h-full flex items-center justify-center">
                  <h1 className="text-white text-5xl font-bold z-20">
                    {showImages ? (
                      <>
                        <X className="w-12 h-12" />
                      </>
                    ) : (
                      <>+{images.length - 2}</>
                    )}
                  </h1>
                </div>
              </button>
            </>
          )}
        </div>
        <div className="border border-gray h-64 rounded-xl py-8 flex justify-center items-center gap-8">
          <div className="px-8 space-y-4 flex flex-col items-center justify-center">
            <Clock className="w-10 h-10 text-primary" />
            <h1 className="text-2xl font-bold">Date</h1>
            <h2 className="text-darkGray text-lg">
              {format(post.date, "dd/MM/yyyy")}
            </h2>
          </div>
          <Separator orientation="vertical" className="bg-gray h-full" />
          <div className="px-8 space-y-4 flex flex-col items-center justify-center">
            <Calendar className="w-10 h-10 text-primary" />
            <h1 className="text-2xl font-bold">Prazo</h1>
            <h2 className="text-darkGray text-lg">{post.deadline}</h2>
          </div>
          <Separator orientation="vertical" className="bg-gray h-full" />
          <div className="px-8 space-y-4 flex flex-col items-center justify-center">
            <Hammer className="w-10 h-10 text-primary" />
            <h1 className="text-2xl font-bold">Status</h1>
            <h2 className="text-darkGray text-lg">
              {post.type === "FINISHED" ? "Finished" : "In Construction"}
            </h2>
          </div>
        </div>
      </div>
      <div className="overflow-hidden">
        <div
          className={`grid grid-cols-3 gap-8 transition-all transform ease-in-out duration-300 ${
            showImages
              ? "opacity-100 max-h-full scale-100"
              : "opacity-0 max-h-0 scale-95"
          }`}
        >
          {images.slice(2).map((image) => (
            <div
              key={image.id}
              className="h-64 relative rounded-xl overflow-hidden group"
            >
              <Image
                src={image.url}
                fill
                alt={`Image ${image.id}`}
                className="object-center object-cover group-hover:scale-110 transition ease-in-out duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostDetails;
