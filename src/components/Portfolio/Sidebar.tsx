"use client";

import { useEffect, useState } from "react";
import { Label } from "../ui/Label";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { MessagesSquare } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import { Button } from "../ui/Button";

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

  const [scroll, setScroll] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollThreshold = 100;

  const handleScroll = () => {
    const distanceFromBottom =
      document.documentElement.scrollHeight -
      window.innerHeight -
      window.scrollY;

    if (window.scrollY > scrollThreshold) {
      setScroll(true);
    } else {
      setScroll(false);
    }

    if (distanceFromBottom < scrollThreshold) {
      setContact(true);
      // Load more content or trigger an action here
    } else {
      setContact(false);
    }
  };

  return (
    <div
      className={cn(
        "space-y-8 lg:fixed lg:w-1/4 px-4 lg:px-12 transition-transform ease-in-out duration-300",
        scroll && "transform translate-y-0 lg:-translate-y-56"
      )}
    >
      <div className="bg-white border border-gray shadow p-8 space-y-4 rounded-xl">
        <h1 className="text-xl font-bold">Tipo de Obras</h1>
        <RadioGroup
          defaultValue={searchParams.get("status") || "all"}
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
          defaultValue={searchParams.get("category") || "all"}
          onValueChange={(value) => handleCategoryChange(value)}
          className="space-y-2 max-h-40 overflow-y-auto truncate"
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
      <div
        className={cn(
          "bg-white border hidden lg:flex border-gray shadow p-8 gap-4 rounded-xl flex-col transition-transform ease-in-out duration-300",
          {
            "scale-0": contact,
          }
        )}
      >
        <div className="flex gap-4 items-center">
          <MessagesSquare className="text-primary w-8 h-8" />

          <h1 className="text-2xl font-bold">Contacte-nos</h1>
        </div>
        <p className="text-darkGray font-bold text-lg">
          Gostou do nosso trabalho?{" "}
          <Button variant={"link"} className="text-primary p-0 font-bold w-fit">
            Contacte-nos.
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
