import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PostDetails from "@/components/Portfolio/PostDetails";
import PostImage from "@/components/Portfolio/PostImage";
import SimilarPosts from "@/components/Portfolio/SimilarPosts";
import { acceleratedDb } from "@/lib/db";
import { notFound } from "next/navigation";

interface pageProps {
  params: {
    name: string;
  };
}

const Page = async ({ params }: pageProps) => {
  const { name } = params;
  const decodedName = decodeURIComponent(name);

  const post = await acceleratedDb.post.findFirst({
    where: { name: decodedName },
    include: {
      category: true,
      images: true,
    },
  });

  if (!post) return notFound();

  return (
    <div className="">
      <Navbar />
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

      <SimilarPosts post={post} />
      <Footer />
    </div>
  );
};

export default Page;
