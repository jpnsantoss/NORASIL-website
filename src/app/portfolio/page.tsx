import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PortfolioContainer from "@/components/Portfolio/PortfolioContainer";
import { acceleratedDb } from "@/lib/db";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const Page = async () => {
  const categories = await acceleratedDb.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
    cacheStrategy: { ttl: 60 },
  });
  return (
    <div>
      <Navbar />
      <Suspense
        fallback={
          <div className="w-full flex justify-center py-32">
            <Loader2 className="animate-spin w-12 h-12 text-center" />
          </div>
        }
      >
        <PortfolioContainer categories={categories} />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Page;
