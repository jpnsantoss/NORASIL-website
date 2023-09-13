"use client";
import { Category } from "@prisma/client";
import Image from "next/image";
import { FC, useState } from "react";
import { Button } from "../ui/Button";

interface InterventionAreasProps {
  categories: Category[];
}

const InterventionAreas: FC<InterventionAreasProps> = ({ categories }) => {
  const [selected, setSelected] = useState(categories[0].id);
  return (
    <div className="py-16 grid gap-8">
      <div className="flex gap-8 w-full justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={category.id === selected ? "default" : "outline"}
            onClick={() => setSelected(category.id)}
          >
            {category.title}
          </Button>
        ))}
      </div>
      {/* <div className="max-w-full overflow-hidden flex">
        {categories.map((category) => (
          <div key={category.id} className="relative">
            <Image
              src={category.imageUrl}
              width={1500}
              height={1500}
              alt={category.name}
            />
          </div>
        ))}
      </div> */}

      <div className="flex p-0 items-center justify-center">
        <div id="wrapper" className="max-w-[1400px] relative">
          <div
            id="carousel"
            className="no-scrollbar flex gap-16 cursor-grab overflow-x-scroll scroll-smooth snap-mandatory snap-x"
          >
            {categories.map((category) => (
              <img
                key={category.id}
                src={category.imageUrl}
                alt="img"
                draggable="false"
                className="flex-shrink-0 h-[600px] w-[1000px] object-cover snap-start"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterventionAreas;
