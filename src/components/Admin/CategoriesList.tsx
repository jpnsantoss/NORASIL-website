"use client";

import { Loader2, X } from "lucide-react";
import { Button } from "../ui/Button";

import { toast } from "@/hooks/use-toast";
import { DeleteCategoryRequest } from "@/lib/validators/category";
import { Category } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
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
  const { mutate: deleteCategory, isPending } = useMutation({
    mutationFn: async ({ id, imageUrl }: DeleteCategoryRequest) => {
      const payload: DeleteCategoryRequest = {
        id,
        imageUrl,
      };
      const { data } = await axios.patch("/api/category/delete", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          return toast({
            title: "Category still has posts.",
            description:
              "Please delete all posts before deleting this category.",
            variant: "destructive",
          });
        }
      }
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
      {isPending ? (
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
                <div className="space-x-2 flex items-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="subtle" size={"sm"}>
                        Edit
                      </Button>
                    </DialogTrigger>
                    <EditCategory category={category} />
                  </Dialog>
                  <AlertDialog>
                    <AlertDialogTrigger>
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
                              imageUrl: category.imageUrl,
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
