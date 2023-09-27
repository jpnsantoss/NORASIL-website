import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PortfolioContainer from "@/components/Portfolio/PortfolioContainer";
import { db } from "@/lib/db";

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
      images: true,
    },
  });
  return (
    <div>
      <Navbar dark />
      <PortfolioContainer posts={posts} categories={categories} />

      <div className="lg:pt-32">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
