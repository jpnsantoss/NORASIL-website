"use client";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Button } from "../ui/Button";

const UsersList = () => {
  return (
    <div className="grid gap-6 max-h-[25vh] overflow-y-auto">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <Avatar className="hidden lg:block">
            <AvatarImage src="/avatars/03.png" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">João Santos</p>
            <p className="text-sm text-muted-foreground">
              jpnsantos14@gmail.com
            </p>
          </div>
        </div>
        <Button variant="ghost">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default UsersList;
