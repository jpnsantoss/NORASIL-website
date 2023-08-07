import Footer from "@/components/Footer";
import Company from "@/components/Home/Company";
import FindUs from "@/components/Home/FindUs";
import Header from "@/components/Home/Header";
import QualityPolicy from "@/components/Home/QualityPolicy";
import ValueOffer from "@/components/Home/ValueOffer";

const page = () => {
  return (
    <div className="w-full h-full m-0">
      <Header />
      {/* -@ts-expect-error server component */}
      {/* <InConstruction /> */}
      <ValueOffer />
      <Company />
      <QualityPolicy />
      <FindUs />
      <Footer />
    </div>
  );
};

export default page;
