"use client";
import { ExtendedPost } from "@/types/db";
import { Image as PrismaImage } from "@prisma/client";
import { format } from "date-fns";
import { Calendar, Clock, Hammer, X } from "lucide-react";
import Image from "next/image";
import { FC, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Separator } from "../ui/Separator";
import PostDialog from "./PostDialog";

interface PostDetailsProps {
  images: PrismaImage[];
  post: ExtendedPost;
}

const PostDetails: FC<PostDetailsProps> = ({ images, post }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-8">
        <Dialog>
          <div className="grid grid-cols-3 gap-2">
            {images.length <= 3 ? (
              images.map((image, index) => (
                <div
                  key={image.id}
                  className="h-64 relative rounded-xl bg-lightGray overflow-hidden group cursor-pointer"
                >
                  <DialogTrigger asChild>
                    <Image
                      src={image.url}
                      fill
                      alt={`Image n${index}`}
                      loading="lazy"
                      className="rounded-md object-cover transition opacity-0 duration-500 object-center  group-hover:scale-105 ease-in-out "
                      onLoadingComplete={(image) =>
                        image.classList.remove("opacity-0")
                      }
                    />
                  </DialogTrigger>
                </div>
              ))
            ) : (
              <>
                <div className="h-64 relative rounded-xl bg-lightGray overflow-hidden group cursor-pointer">
                  <DialogTrigger asChild>
                    <Image
                      src={images[0].url}
                      fill
                      alt={`Image n0`}
                      loading="lazy"
                      className="rounded-md object-cover transition opacity-0 duration-500 object-center  group-hover:scale-105 ease-in-out "
                      onLoadingComplete={(image) =>
                        image.classList.remove("opacity-0")
                      }
                    />
                  </DialogTrigger>
                </div>
                <div className="h-64 relative rounded-xl bg-lightGray overflow-hidden group cursor-pointer">
                  <DialogTrigger asChild>
                    <Image
                      src={images[1].url}
                      fill
                      alt={`Image n0`}
                      loading="lazy"
                      className="rounded-md object-cover transition opacity-0 duration-500 object-center  group-hover:scale-105 ease-in-out "
                      onLoadingComplete={(image) =>
                        image.classList.remove("opacity-0")
                      }
                    />
                  </DialogTrigger>
                </div>
                <div className="h-64 relative rounded-xl bg-lightGray overflow-hidden group cursor-pointer">
                  <DialogTrigger asChild>
                    <Image
                      src={images[2].url}
                      fill
                      alt={`Image n0`}
                      loading="lazy"
                      className="rounded-md object-cover transition opacity-0 duration-500 object-center  group-hover:scale-105 ease-in-out "
                      onLoadingComplete={(image) =>
                        image.classList.remove("opacity-0")
                      }
                    />
                    <div className="w-full h-full bg-black opacity-75 absolute top-0 left-0" />
                    <div className="w-full h-full flex items-center justify-center">
                      <h1 className="text-white text-5xl font-bold z-20">
                        <>+{images.length - 2}</>
                      </h1>
                    </div>
                  </DialogTrigger>
                </div>
              </>
            )}
          </div>

          <PostDialog images={images} post={post} />
        </Dialog>
        <div className="border border-gray h-64 rounded-xl py-8 flex justify-center items-center gap-8">
          <div className="px-8 space-y-4 flex flex-col items-center justify-center">
            <Clock className="w-10 h-10 text-primary" />
            <h1 className="text-2xl font-bold">Data</h1>
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
            <h1 className="text-2xl font-bold">Estado</h1>
            <h2 className="text-darkGray text-lg">
              {post.type === "FINISHED" ? "Terminado" : "Em Construção"}
            </h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
