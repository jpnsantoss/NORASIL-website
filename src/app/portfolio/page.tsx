import PostsSearch from "@/components/Admin/PostsSearch";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Portfolio/Sidebar";
import { buttonVariants } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const posts = await db.post.findMany({
    take: 5,
    orderBy: {
      date: "desc",
    },
    include: {
      category: true,
    },
  });
  return (
    <div>
      <Navbar dark />

      <div className="mx-auto w-full lg:px-16 grid lg:grid-cols-4 gap-16 my-16">
        <Sidebar categories={categories} />
        <div className="lg:col-span-3 lg:col-start-2 w-full h-full space-y-16">
          <div className="px-4 lg:w-1/2">
            <PostsSearch />
          </div>
          <div className="w-full space-y-16 lg:space-y-32">
            {posts.map((post) => (
              <div
                key={post.id}
                className="grid lg:grid-cols-2 gap-8 px-4 lg:h-96"
              >
                <div className="h-64 lg:h-full relative rounded-lg overflow-hidden group">
                  <Image
                    src={post.mainImageUrl}
                    fill
                    alt={post.title}
                    className="object-center object-cover group-hover:scale-110 transition ease-in-out duration-500"
                  />
                </div>
                <div className="h-full flex flex-col lg:justify-between">
                  <div className="space-y-4">
                    <h1 className="text-3xl lg:text-5xl font-bold">
                      {post.title}
                    </h1>
                    <h2 className="text-darkGray text-2xl">
                      #{post.category.title}
                    </h2>
                  </div>
                  <Link
                    href={`/posts/${post.name}`}
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "text-primary p-0 text-2xl font-bold w-fit"
                    )}
                  >
                    See More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="lg:pt-32">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
