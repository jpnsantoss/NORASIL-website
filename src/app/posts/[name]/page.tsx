import DeletePost from "@/components/Admin/DeletePost";
import EditPost from "@/components/Admin/EditPost";
import PostImages from "@/components/Admin/PostImages";
import Footer from "@/components/Footer";
import InConstruction from "@/components/Home/InConstruction";
import Navbar from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronLeft, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface pageProps {
  params: {
    name: string;
  };
}

const Page = async ({ params }: pageProps) => {
  const { name } = params;
  const decodedName = decodeURIComponent(name);

  const post = await db.post.findFirst({
    where: { name: decodedName },
    include: {
      category: true,
      images: true,
    },
  });

  const categories = await db.category.findMany();

  if (!post) return notFound();

  return (
    <div className="">
      <Navbar dark />
      <div className="container space-y-8">
        <div className="relative w-full h-[60vh] rounded-xl shadow-md overflow-hidden">
          <Image
            src={post.mainImageUrl}
            alt={post.title}
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="grid grid-cols-3 gap-2">
            {post.images.map((image, index) => (
              <div
                key={image.id}
                className="h-64 relative rounded-xl overflow-hidden"
              >
                <Image
                  src={image.url}
                  fill
                  alt={`Image n${index}`}
                  className="object-cover object-center"
                />
              </div>
            ))}
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
              <Clock className="w-10 h-10 text-primary" />
              <h1 className="text-2xl font-bold">Prazo</h1>
              <h2 className="text-darkGray text-lg">{post.deadline}</h2>
            </div>
            <Separator orientation="vertical" className="bg-gray h-full" />
            <div className="px-8 space-y-4 flex flex-col items-center justify-center">
              <Clock className="w-10 h-10 text-primary" />
              <h1 className="text-2xl font-bold">Status</h1>
              <h2 className="text-darkGray text-lg">
                {post.type === "FINISHED" ? "Finished" : "In Construction"}
              </h2>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">{post.title}</h1>
          <h2 className="text-2xl text-darkGray">
            <span className="text-primary"># </span>
            {post.category.title}
          </h2>
          <h2 className="text-2xl text-darkGray">
            <span className="font-bold text-black">Client: </span>
            {post.client}
          </h2>
        </div>
      </div>
      {/* @ts-expect-error server component */}
      <InConstruction />
      <Footer />
    </div>
  );
};

export default Page;
