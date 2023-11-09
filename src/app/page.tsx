import Footer from "@/components/Footer";
import Company from "@/components/Home/Company";
import FindUs from "@/components/Home/FindUs";
import Header from "@/components/Home/Header";
import InConstruction from "@/components/Home/InConstruction";
import InterventionAreas from "@/components/Home/InterventionAreas";
import QualityPolicy from "@/components/Home/QualityPolicy";
import ValueOffer from "@/components/Home/ValueOffer";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const page = () => {
  return (
    <div className="w-full h-full m-0">
      <Header />
      <Suspense
        fallback={
          <div className="w-full flex justify-center py-32">
            <Loader2 className="animate-spin w-12 h-12 text-center" />
          </div>
        }
      >
        {/* @ts-expect-error server component */}
        <InConstruction />
      </Suspense>
      <ValueOffer />
      <Company />
      <Suspense
        fallback={
          <div className="w-full flex justify-center py-32">
            <Loader2 className="animate-spin w-12 h-12 text-center" />
          </div>
        }
      >
        {/* @ts-expect-error server component */}
        <InterventionAreas />
      </Suspense>
      <QualityPolicy />
      <FindUs />
      <Footer />
    </div>
  );
};

export default page;
