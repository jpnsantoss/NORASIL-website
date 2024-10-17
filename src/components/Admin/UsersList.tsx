"use client";
import type { AuthorizedEmail, User } from "@prisma/client";
import { Loader2, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";

import { toast } from "@/hooks/use-toast";
import type { EmailRequest } from "@/lib/validators/email";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertDialog";

interface UsersListProps {
  authorizedEmails: (AuthorizedEmail & { user: User | null })[];
}

const UsersList: FC<UsersListProps> = ({ authorizedEmails }) => {
  const router = useRouter();

  const { mutate: deleteUser, isPending } = useMutation({
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
    <div className="grid gap-6 overflow-y-auto">
      {isPending ? (
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <>
          {authorizedEmails.map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between space-x-4 overflow-x-hidden"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="hidden lg:block">
                    <AvatarImage
                      src={item.user?.image ?? "/assets/images/user.png"}
                    />
                    <AvatarFallback>?</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {item.user?.name ?? item.email.split("@")[0]}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.email}
                    </p>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger className="overflow-hidden">
                    <div className="p-2 hover:scale-125 hover:text-destructive transition duration-300 ease-in-out">
                      <X className="w-5 h-5" />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this category and all the posts associated to it.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          if (item.email) deleteUser({ email: item.email });
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default UsersList;
