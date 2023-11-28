import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PortfolioContainer from "@/components/Portfolio/PortfolioContainer";
import { db } from "@/lib/db";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const Page = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <Navbar dark />
      <Suspense
        fallback={
          <div className="w-full flex justify-center py-32">
            <Loader2 className="animate-spin w-12 h-12 text-center" />
          </div>
        }
      >
        <PortfolioContainer categories={categories} />
      </Suspense>
      <div className="lg:pt-96x">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
