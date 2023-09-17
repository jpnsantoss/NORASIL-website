import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AspectRatio } from "../ui/AspectRatio";
import { buttonVariants } from "../ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";
import InterventionImages from "./InterventionImages";

const InterventionAreas = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="w-full px-4 lg:px-48 py-16">
      <h1 className="text-5xl font-bold text-center leading-[4.5rem]">
        Áreas de <span className=" bg-secondary">Intervenção</span>
      </h1>
      <Tabs defaultValue={categories[0].name} className="pt-16">
        <TabsList className="h-full flex flex-col xl:flex-row w-full gap-8 bg-transparent">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.name}
              // className="font-bold text-2xl text-darkGray"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "data-[state=active]:bg-secondary data-[state=active]:outline-secondary data-[state=active]:text-darkGray"
              )}
            >
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <InterventionImages key={category.id} category={category} />
        ))}
      </Tabs>
    </div>
  );
};

export default InterventionAreas;
