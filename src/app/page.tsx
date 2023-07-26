import Header from "@/components/Home/Header";
import RecentBuilds from "@/components/Home/RecentBuilds";

const page = () => {
  return (
    <div className="w-full h-full m-0">
      <Header />
      {/* @ts-expect-error server component */}
      <RecentBuilds />
    </div>
  );
};

export default page;
