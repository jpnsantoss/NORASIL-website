"use client";
import { AuthorizedEmail, User } from "@prisma/client";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Button } from "../ui/Button";

import { toast } from "@/hooks/use-toast";
import { EmailRequest } from "@/lib/validators/email";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface UsersListProps {
  authorizedEmails: (AuthorizedEmail & { user: User | null })[];
}

const UsersList: FC<UsersListProps> = ({ authorizedEmails }) => {
  const router = useRouter();

  const { mutate: deleteUser, isLoading } = useMutation({
    mutationFn: async ({ email }: EmailRequest) => {
      const payload: EmailRequest = {
        email,
      };
      const { data } = await axios.patch("/api/user", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong",
        description: "User wasn't removed successfully, please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      return toast({
        description: "User was removed successfully.",
      });
    },
  });
  return (
    <div className="grid gap-6 max-h-[25vh] overflow-y-auto">
      {authorizedEmails.map((item, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-between space-x-4"
          >
            <div className="flex items-center space-x-4">
              <Avatar className="hidden lg:block">
                <AvatarImage
                  src={item.user?.image || "/assets/images/user.png"}
                />
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {item.user?.name || item.email.split("@")[0]}
                </p>
                <p className="text-sm text-muted-foreground">{item.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              isLoading={isLoading}
              className="m-1.5 mr-2"
            >
              <X
                className="w-4 h-4"
                onClick={() => {
                  if (item.email) deleteUser({ email: item.email });
                }}
              />
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;
