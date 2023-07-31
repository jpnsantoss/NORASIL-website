import Company from "@/components/Home/Company";
import Header from "@/components/Home/Header";
import RecentBuilds from "@/components/Home/RecentBuilds";
import ValueOffer from "@/components/Home/ValueOffer";

const page = () => {
  return (
    <div className="w-full h-full m-0">
      <Header />
      {/* @ts-expect-error server component */}
      <RecentBuilds />
      <ValueOffer />
      <Company />
    </div>
  );
};

export default page;
