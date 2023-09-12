import { db } from "@/lib/db";
import InterventionAreas from "./InterventionAreas";

const InterventionAreasContainer = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="py-16">
      <h1 className="text-5xl font-bold text-center">
        Áreas de <span className=" bg-secondary">Intervenção</span>
      </h1>

      <InterventionAreas categories={categories} />
    </div>
  );
};

export default InterventionAreasContainer;
