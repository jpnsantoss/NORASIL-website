import CategoriesContainer from "@/components/Admin/CategoriesContainer";
import UsersContainer from "@/components/Admin/UsersContainer";
import { getAuthSession } from "@/lib/auth";

const Page = async ({}) => {
  const session = await getAuthSession();
  return (
    <div className="container flex flex-col gap-4">
      <h1 className="font-semibold text-2xl my-4">
        Welcome back, {session?.user.name ?? "... "}!
      </h1>
      <div className="grid lg:grid-cols-3 w-full gap-4">
        <CategoriesContainer />
        <UsersContainer />
      </div>
    </div>
  );
};

export default Page;
