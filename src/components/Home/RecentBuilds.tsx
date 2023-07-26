import { db } from "@/lib/db";
import PostCard from "./PostCard";

const RecentBuilds = async () => {
  const posts = await db.post.findMany({
    where: {
      type: "CONSTRUCTION",
    },
    take: 3,
    orderBy: {
      date: "desc",
    },
  });
  return (
    <div className="py-32">
      <h1 className="text-4xl font-bold text-center">
        <span className=" bg-secondary">Obras</span> Recentes
      </h1>

      <div>
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default RecentBuilds;
