"use client";
import { cn } from "@/lib/utils";
import { ExtendedPost } from "@/types/db";
import { Image as PrismaImage } from "@prisma/client";
import { Calendar, Hammer, MapPin } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";

interface PostDetailsProps {
  images: PrismaImage[];
  post: ExtendedPost;
}

const PostDetails: FC<PostDetailsProps> = ({ images, post }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  return (
    <>
      <div className="grid lg:grid-cols-2 gap-8">
        {images && (
          <Dialog>
            <div className="grid lg:grid-cols-3 gap-2">
              {images.length <= 3 ? (
                images.map((image, index) => (
                  <div
                    key={image.id}
                    className="h-64 relative rounded-xl bg-lightGray overflow-hidden group cursor-pointer"
                  >
                    <DialogTrigger
                      asChild
                      onClick={() => setSelectedImage(image)}
                    >
                      <Image
                        src={image.url}
                        fill
                        alt={`Image n${index}`}
                        loading="lazy"
                        className="rounded-md object-cover transition opacity-0 duration-500 object-center  group-hover:scale-105 ease-in-out "
                        onLoad={(event) => {
                          const image = event.target as HTMLImageElement;
                          image.classList.remove("opacity-0");
                        }}
                      />
                    </DialogTrigger>
                  </div>
                ))
              ) : (
                <>
                  <div className="h-64 relative rounded-xl bg-lightGray overflow-hidden group cursor-pointer">
                    <DialogTrigger
                      asChild
                      onClick={() => setSelectedImage(images[0])}
                    >
                      <Image
                        src={images[0].url}
                        fill
                        alt={`Image n0`}
                        loading="lazy"
                        className="rounded-md object-cover transition opacity-0 duration-500 object-center  group-hover:scale-105 ease-in-out "
                        onLoad={(event) => {
                          const image = event.target as HTMLImageElement;
                          image.classList.remove("opacity-0");
                        }}
                      />
                    </DialogTrigger>
                  </div>
                  <div className="h-64 relative rounded-xl bg-lightGray overflow-hidden group cursor-pointer">
                    <DialogTrigger
                      asChild
                      onClick={() => setSelectedImage(images[1])}
                    >
                      <Image
                        src={images[1].url}
                        fill
                        alt={`Image n0`}
                        loading="lazy"
                        className="rounded-md object-cover transition opacity-0 duration-500 object-center  group-hover:scale-105 ease-in-out "
                        onLoad={(event) => {
                          const image = event.target as HTMLImageElement;
                          image.classList.remove("opacity-0");
                        }}
                      />
                    </DialogTrigger>
                  </div>
                  <div className="h-64 relative rounded-xl bg-lightGray overflow-hidden group cursor-pointer">
                    <DialogTrigger
                      asChild
                      onClick={() => setSelectedImage(images[0])}
                    >
                      <div className="w-full h-full">
                        <Image
                          src={images[2].url}
                          fill
                          alt={`Image n0`}
                          loading="lazy"
                          className="rounded-md object-cover transition opacity-0 duration-500 object-center  group-hover:scale-105 ease-in-out "
                          onLoad={(event) => {
                            const image = event.target as HTMLImageElement;
                            image.classList.remove("opacity-0");
                          }}
                        />
                        <div className="w-full h-full bg-black opacity-75 absolute top-0 left-0" />
                        <div className="w-full h-full flex items-center justify-center">
                          <h1 className="text-white text-5xl font-bold z-20">
                            <>+{images.length - 2}</>
                          </h1>
                        </div>
                      </div>
                    </DialogTrigger>
                  </div>
                </>
              )}
            </div>
            {images.length > 0 && (
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
                        onLoad={(event) => {
                          const image = event.target as HTMLImageElement;
                          image.classList.remove("opacity-0");
                        }}
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
                            image.id == selectedImage.id &&
                              "border-2 border-black"
                          )}
                        >
                          <Image
                            src={image.url}
                            alt={`${post.title} Image ${image.id}`}
                            fill
                            loading="lazy"
                            className="rounded-md object-cover transition opacity-0 duration-500 object-center  group-hover:scale-105 ease-in-out "
                            onLoad={(event) => {
                              const image = event.target as HTMLImageElement;
                              image.classList.remove("opacity-0");
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </DialogContent>
            )}
          </Dialog>
        )}
        <div className="border border-gray min-h-64 rounded-xl py-8 grid md:grid-cols-3 gap-8 md:gap-0 overflow-x-auto">
          <div className="px-8 space-y-4 flex flex-col items-center justify-center lg:border-r border-gray">
            <MapPin className="w-10 h-10 text-primary" />
            <h1 className="text-2xl font-bold">Local</h1>
            <h2 className="text-darkGray text-lg">{post.local}</h2>
          </div>
          <div className="px-8 space-y-4 flex flex-col items-center justify-center lg:border-r border-gray">
            <Calendar className="w-10 h-10 text-primary" />
            <h1 className="text-2xl font-bold">Prazo</h1>
            <h2 className="text-darkGray text-lg">{post.deadline}</h2>
          </div>
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
