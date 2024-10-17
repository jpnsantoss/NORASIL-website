import { db } from "@/lib/db";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Separator } from "../ui/Separator";
import CategoriesForm from "./CategoriesForm";
import CategoriesList from "./CategoriesList";

const CategoriesContainer = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>
          Categories that can be assigned to posts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CategoriesForm />
        <Separator className="mt-8 mb-4" />

        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm font-medium">
                <span>List of categories</span>
              </AccordionTrigger>
              <AccordionContent>
                <CategoriesList categories={categories} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoriesContainer;
