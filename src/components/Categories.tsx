"use client";
import { X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/Accordion";
import { Button } from "./ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/Card";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Separator } from "./ui/Separator";

const Categories = () => {
  return (
    <Card className="lg:col-span-2 min-h-[40vh]">
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>
          Categories that can be assigned to posts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 my-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Name" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" />
          </div>
          <Button className="px-8">Create</Button>
        </div>
        <Separator className="mt-8 mb-4" />

        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm font-medium">
                <span>List of categories</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-6 max-h-[40vh] overflow-y-auto">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm font-medium leading-none">
                          Educação e Saúde
                        </p>
                        <p className="text-sm text-muted-foreground">
                          educacao
                        </p>
                      </div>
                    </div>
                    <div className="space-x-2">
                      <Button variant="ghost">Picture</Button>
                      <Button variant="ghost">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

export default Categories;
