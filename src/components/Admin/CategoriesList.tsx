"use client";

import { Loader2, X } from "lucide-react";
import { Button, buttonVariants } from "../ui/Button";

import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { DeleteCategoryRequest } from "@/lib/validators/category";
import { Category } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC } from "react";
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
import { Dialog, DialogTrigger } from "../ui/Dialog";
import { default as EditCategory } from "./EditCategory";

interface CategoriesListProps {
  categories: Category[];
}

const CategoriesList: FC<CategoriesListProps> = ({ categories }) => {
  const router = useRouter();
  const { mutate: deleteCategory, isLoading } = useMutation({
    mutationFn: async ({ id, imageKey }: DeleteCategoryRequest) => {
      const payload: DeleteCategoryRequest = {
        id,
        imageKey,
      };
      const { data } = await axios.patch("/api/category/delete", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong",
        description: "Category wasn't removed successfully, please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      return toast({
        description: "Category was removed successfully.",
      });
    },
  });
  return (
    <div className="grid gap-6 overflow-y-auto p-2">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <>
          {categories.map((category) => {
            return (
              <div
                key={category.id}
                className="flex items-center justify-between space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {category.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {category.name}
                    </p>
                  </div>
                </div>
                <div className="space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Edit</Button>
                    </DialogTrigger>
                    <EditCategory category={category} />
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      {isLoading ? (
                        <div
                          className={cn(buttonVariants({ variant: "ghost" }))}
                        >
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </div>
                      ) : (
                        <div
                          className={cn(buttonVariants({ variant: "ghost" }))}
                        >
                          <X className="w-4 h-4" />
                        </div>
                      )}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this category and all the posts associated to
                          it.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() =>
                            deleteCategory({
                              id: category.id,
                              imageKey: category.imageKey,
                            })
                          }
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default CategoriesList;