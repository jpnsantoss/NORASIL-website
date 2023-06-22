"use client";

import { X } from "lucide-react";
import { Button } from "../ui/Button";

import { Category } from "@prisma/client";
import { FC } from "react";

interface CategoriesListProps {
  data: Category[];
}

const CategoriesList: FC<CategoriesListProps> = ({ data: categories }) => {
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
              <Button variant="ghost">
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
