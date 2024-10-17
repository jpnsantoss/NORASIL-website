"use client";

import { Label } from "../ui/Label";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";

import type { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import type { FC } from "react";

interface SidebarProps {
  categories: Category[];
}

const Sidebar: FC<SidebarProps> = ({ categories }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = async (category: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newUrl);
  };

  const handleStatusChange = (status: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (status === "all") {
      searchParams.delete("status");
    } else {
      searchParams.set("status", status);
    }

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newUrl);
  };

  return (
    <div className="lg:sticky lg:top-10 space-y-8">
      <div className="bg-white border border-gray shadow p-8 space-y-4 rounded-xl">
        <h1 className="text-xl font-bold">Tipo de Obras</h1>
        <RadioGroup
          defaultValue={searchParams.get("status") ?? "all"}
          onValueChange={(value) => handleStatusChange(value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="text-lg font-semibold">
              Todas
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="FINISHED" id="FINISHED" />
            <Label htmlFor="FINISHED" className="text-lg font-semibold">
              Terminadas
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="CONSTRUCTION" id="CONSTRUCTION" />
            <Label htmlFor="CONSTRUCTION" className="text-lg font-semibold">
              Em Construção
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="bg-white border border-gray shadow p-8 space-y-4 rounded-xl">
        <h1 className="text-xl font-bold">Áreas de Intervenção</h1>
        <RadioGroup
          defaultValue={searchParams.get("category") ?? "all"}
          onValueChange={(value) => handleCategoryChange(value)}
          className="space-y-2 truncate"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={"all"} id={"all"} />
            <Label htmlFor={"all"} className="text-lg font-semibold">
              Geral
            </Label>
          </div>
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <RadioGroupItem value={category.name} id={category.name} />
              <Label htmlFor={category.name} className="text-lg font-semibold">
                {category.title}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default Sidebar;
