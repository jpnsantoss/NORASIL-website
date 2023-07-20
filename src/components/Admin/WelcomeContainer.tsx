import { cn } from "@/lib/utils";
import { User } from "next-auth";
import Link from "next/link";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { buttonVariants } from "../ui/Button";
import { Card } from "../ui/Card";

interface WelcomeContainerProps {
  user?: User;
}

const WelcomeContainer: FC<WelcomeContainerProps> = ({ user }) => {
  return (
    <Card>
      <div className="grid lg:grid-cols-3 gap-8 p-12 items-center h-fit">
        <div className="space-y-2">
          <Avatar className="hidden lg:block">
            <AvatarImage src={user?.image || "/assets/images/user.png"} />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {user?.name || "User"}.
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-lg font-semibold">New dashboard</span>
          This is where you can manage Norasil website, by
          adding/editing/deliting posts, categories and users.
        </div>
        <div className="flex flex-col gap-2 border-l pl-8">
          <span className="text-lg font-semibold">See Posts</span>
          You want to create, edit or delete posts?
          <Link href="/admin/posts" className={cn(buttonVariants())}>
            Manage Posts
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default WelcomeContainer;
