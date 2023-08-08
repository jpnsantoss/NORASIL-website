import { db } from "@/lib/db";
import { Button } from "../ui/Button";
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
        <Button
          size={"lg"}
          className="text-xl font-bold py-6 px-10 rounded-lg shadow-md shadow-secondary"
        >
          Ver Obras
        </Button>
      </div>
    </div>
  );
};

export default InConstruction;
