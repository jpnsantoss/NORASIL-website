import { acceleratedDb } from "@/lib/db";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import PostCard from "../PostCard";
import { buttonVariants } from "../ui/Button";

const InConstruction = async () => {
  const t = await getTranslations("HomePage.InConstruction");
  const posts = await acceleratedDb.post.findMany({
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
    cacheStrategy: { ttl: 60 },
  });
  if (posts.length > 0) {
    return (
      <div className="py-16 lg:pt-32">
        <h1
          className="text-5xl font-bold text-center leading-[4.5rem]"
          dangerouslySetInnerHTML={{ __html: t.raw("title") }}
        />

        <div className="container lg:px-24 grid lg:grid-cols-3 gap-8 lg:gap-24 py-16 mx-auto">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
        <div className="w-full flex justify-center">
          <Link
            href={"/portfolio?status=CONSTRUCTION"}
            className={cn(buttonVariants({ size: "lg" }), "shadow-btn")}
          >
            {t("button")}
          </Link>
        </div>
      </div>
    );
  }
};

export default InConstruction;
