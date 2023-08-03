import Company from "@/components/Home/Company";
import Header from "@/components/Home/Header";
import InConstruction from "@/components/Home/InConstruction";
import ValueOffer from "@/components/Home/ValueOffer";

const page = () => {
  return (
    <div className="w-full h-full m-0">
      <Header />
      {/* @ts-expect-error server component */}
      <InConstruction />
      <ValueOffer />
      <Company />
    </div>
  );
};

export default page;
