import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/Button";
import PostCard from "./PostCard";

const InConstruction = async () => {
  const posts = await db.post.findMany({
    where: {
      type: "CONSTRUCTION",
    },
    take: 3,
    orderBy: {
      date: "desc",
    },
    include: {
      images: true,
      category: true,
    },
  });
  return (
    <div className="py-16 lg:pt-32">
      <h1 className="text-5xl font-bold text-center leading-[4.5rem]">
        Obras em <span className=" bg-secondary">Construção</span>
      </h1>

      <div className="container lg:px-24 grid lg:grid-cols-3 gap-8 lg:gap-24 py-16 mx-auto">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <Link
          href={"/portfolio"}
          className={cn(buttonVariants({ size: "lg" }), "shadow-btn")}
        >
          Ver Obras
        </Link>
      </div>
    </div>
  );
};

export default InConstruction;
