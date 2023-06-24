import CategoriesContainer from "@/components/Admin/CategoriesContainer";
import UsersContainer from "@/components/Admin/UsersContainer";
import WelcomeContainer from "@/components/Admin/WelcomeContainer";
import { getAuthSession } from "@/lib/auth";

const Page = async ({}) => {
  const session = await getAuthSession();
  return (
    <div className="container flex flex-col gap-4">
      <h1 className="font-semibold text-2xl my-4">
        Welcome back, {session?.user.name ?? "... "}!
      </h1>
      <div className="grid lg:grid-cols-3 w-full gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <WelcomeContainer user={session?.user} />
          {/* @ts-expect-error server component */}
          <CategoriesContainer />
        </div>
        {/* @ts-expect-error server component */}
        <UsersContainer />
      </div>
    </div>
  );
};

export default Page;
