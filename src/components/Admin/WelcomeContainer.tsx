"use client";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Button, buttonVariants } from "../ui/Button";
import { Card } from "../ui/Card";

interface WelcomeContainerProps {
  user?: User;
}
const inter = Inter({ subsets: ["latin"] });
const WelcomeContainer: FC<WelcomeContainerProps> = ({ user }) => {
  const router = useRouter();
  return (
    <Card className="lg:h-64">
      <div className="grid lg:grid-cols-3 gap-8 p-12 items-center h-fit">
        <div className="space-y-2 flex flex-row-reverse lg:block gap-4 justify-end items-center">
          <Avatar>
            <AvatarImage src={user?.image ?? "/assets/images/user.png"} />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <h1 className={cn("text-lg font-semibold", inter.className)}>
            Welcome back, <br />
            <span className="text-2xl font-bold">{user?.name ?? "User"}</span>.
          </h1>
          <Button
            size={"xs"}
            variant={"link"}
            className="gap-2"
            onClick={() => {
              signOut();
              router.push("/");
            }}
          >
            <LogOut />
            Logout
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-lg font-semibold">New dashboard</span>
          This is where you can manage Norasil website, by
          adding/editing/deliting posts, categories and users.
        </div>
        <div className="flex flex-col gap-2 lg:border-l border-t lg:border-t-0 border-gray pt-8 lg:pt-0 lg:pl-8">
          <span className="text-lg font-semibold">See Posts</span>
          You want to create, edit or delete posts?
          <Link
            href="/admin/posts"
            className={cn(buttonVariants(), "shadow-btn mt-4 lg:mt-0")}
          >
            Posts
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default WelcomeContainer;
