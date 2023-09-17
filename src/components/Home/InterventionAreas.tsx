import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { AspectRatio } from "../ui/AspectRatio";
import { buttonVariants } from "../ui/Button";
import { Separator } from "../ui/Separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/Tabs";

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
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => (
          <TabsContent
            key={category.id}
            value={category.name}
            className="container py-8 px-4 lg:px-48 relative"
          >
            <AspectRatio ratio={16 / 9} className="bg-muted shadow rounded-md">
              <Image
                src={category.imageUrl}
                alt={category.title}
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default InterventionAreas;
