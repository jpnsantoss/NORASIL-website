"use client";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";
import type { FC } from "react";
import { Button } from "./ui/Button";

interface UserAccountNavProps {
  user: Pick<User, "name" | "image" | "email">;
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
  return (
    <div className="flex gap-4 items-center">
      Welcome, {user.name}
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default UserAccountNav;
