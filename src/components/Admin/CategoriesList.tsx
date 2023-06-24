"use client";

import { X } from "lucide-react";
import { Button } from "../ui/Button";

import { toast } from "@/hooks/use-toast";
import { DeleteCategoryRequest } from "@/lib/validators/category";
import { Category } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC } from "react";

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
      const { data } = await axios.patch("/api/category", payload);
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
    <div className="grid gap-6 max-h-[40vh] overflow-y-auto p-2">
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
                <p className="text-sm text-muted-foreground">{category.name}</p>
              </div>
            </div>
            <div className="space-x-2">
              <Button variant="ghost">Picture</Button>
              <Button
                variant="ghost"
                isLoading={isLoading}
                onClick={() =>
                  deleteCategory({
                    id: category.id,
                    imageKey: category.imageKey,
                  })
                }
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoriesList;
