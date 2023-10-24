import Footer from "@/components/Footer";
import InConstruction from "@/components/Home/InConstruction";
import Navbar from "@/components/Navbar";
import PostDetails from "@/components/Portfolio/PostDetails";
import PostImage from "@/components/Portfolio/PostImage";
import SimilarPosts from "@/components/Portfolio/SimilarPosts";
import { db } from "@/lib/db";
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
        <PostImage post={post} />

        <PostDetails post={post} images={post.images} />
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">{post.title}</h1>
          <h2 className="text-2xl text-darkGray">
            <span className="text-primary"># </span>
            {post.category.title}
          </h2>
          <h2 className="text-2xl text-darkGray">
            <span className="font-bold text-black">Cliente: </span>
            {post.client}
          </h2>
        </div>
      </div>

      {/* @ts-expect-error server component */}
      <SimilarPosts post={post} />
      <Footer />
    </div>
  );
};

export default Page;
