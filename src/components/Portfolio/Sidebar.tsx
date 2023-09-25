"use client";

import { useContext, useEffect, useState } from "react";
import { Label } from "../ui/Label";
import { RadioGroup, RadioGroupItem } from "../ui/RadioGroup";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { MessagesSquare } from "lucide-react";
import { FC } from "react";
import { Button } from "../ui/Button";
import { PortfolioContext } from "./PortfolioContainer";

interface SidebarProps {
  categories: Category[];
}

const Sidebar: FC<SidebarProps> = ({ categories }) => {
  const [scroll, setScroll] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const portfolioContext = useContext(PortfolioContext);

  if (!portfolioContext) {
    // Handle the case when the context is null
    return null; // Or return some default value or component
  }

  const { category, setCategory, status, setStatus } = portfolioContext;

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
        "space-y-8 lg:fixed lg:w-1/4 px-4 lg:px-16 transition-transform ease-in-out duration-300",
        scroll && "transform translate-y-0 lg:-translate-y-48"
      )}
    >
      <div className="bg-white border border-gray shadow p-8 space-y-8 rounded-xl">
        <h1 className="text-3xl font-bold">Status</h1>
        <RadioGroup
          defaultValue="all"
          onValueChange={(value) => setStatus(value)}
          className="space-y-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all" className="text-lg font-semibold">
              All
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="CONSTRUCTION" id="FINISHED" />
            <Label htmlFor="FINISHED" className="text-lg font-semibold">
              Finished Projects
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="CONSTRUCTION" id="CONSTRUCTION" />
            <Label htmlFor="CONSTRUCTION" className="text-lg font-semibold">
              Under Construction
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="bg-white border border-gray shadow p-8 space-y-8 rounded-xl">
        <h1 className="text-3xl font-bold">Categories</h1>
        <RadioGroup
          defaultValue="all"
          onValueChange={(value) => {
            setCategory(value);
          }}
          className="space-y-4"
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

          <h1 className="text-2xl font-bold">Contact Us</h1>
        </div>
        <p className="text-darkGray font-bold text-lg">
          You like what we are doing?{" "}
          <Button variant={"link"} className="text-primary p-0 font-bold w-fit">
            Contact us
          </Button>
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
