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
    <div className="py-16">
      <h1 className="text-4xl font-bold text-center">
        Obras em <span className=" bg-secondary">Construção</span>
      </h1>

      <div className="container grid lg:grid-cols-3 gap-24 py-16 mx-auto">
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
