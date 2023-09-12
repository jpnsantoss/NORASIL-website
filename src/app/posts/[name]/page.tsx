import Footer from "@/components/Footer";
import InConstruction from "@/components/Home/InConstruction";
import Navbar from "@/components/Navbar";
import PostDetails from "@/components/Portfolio/PostDetails";
import { Separator } from "@/components/ui/Separator";
import { db } from "@/lib/db";
import { format } from "date-fns";
import { Calendar, Clock, Hammer } from "lucide-react";
import Image from "next/image";
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

  if (!post) return notFound();

  return (
    <div className="">
      <Navbar dark />
      <div className="container space-y-8">
        <div className="relative w-full h-[60vh] rounded-xl shadow-md overflow-hidden group">
          <Image
            src={post.mainImageUrl}
            alt={post.title}
            fill
            className="object-center object-cover group-hover:scale-105 transition ease-in-out duration-500"
          />
        </div>

        <PostDetails post={post} images={post.images} />
      </div>

      {/* @ts-expect-error server component */}
      <InConstruction />
      <Footer />
    </div>
  );
};

export default Page;
