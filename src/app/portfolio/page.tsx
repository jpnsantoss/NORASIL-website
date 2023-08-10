import PostsSearch from "@/components/Admin/PostsSearch";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { MessagesSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const posts = await db.post.findMany({
    take: 5,
    orderBy: {
      date: "desc",
    },
    include: {
      category: true,
    },
  });
  return (
    <div>
      <Navbar dark />

      <div className="mx-auto w-full px-16 grid grid-cols-4 gap-16 my-16">
        <div className="w-full space-y-8">
          <div className="bg-white border border-gray shadow p-8 space-y-8 rounded-xl">
            <h1 className="text-3xl font-bold">Status</h1>
            <RadioGroup defaultValue="FINISHED" className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="FINISHED" id="finished" />
                <Label htmlFor="finished" className="text-lg font-semibold">
                  Finished Projects
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="CONSTRUCTION" id="construction" />
                <Label htmlFor="construction" className="text-lg font-semibold">
                  Under Construction
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="bg-white border border-gray shadow p-8 space-y-8 rounded-xl">
            <h1 className="text-3xl font-bold">Categories</h1>
            <RadioGroup defaultValue="FINISHED" className="space-y-4">
              {categories.map((category, index) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={category.id} id={category.name} />
                  <Label
                    htmlFor={category.name}
                    className="text-lg font-semibold"
                  >
                    {category.title}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="bg-white border border-gray shadow p-8 space-y-8 rounded-xl flex flex-col items-center">
            <MessagesSquare className="text-primary w-24 h-24" />

            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="text-darkGray font-bold text-xl text-center px-8">
              You like what we are doing? Contact us so we can help you as well!
            </p>
            <Button>Contact</Button>
          </div>
        </div>
        <div className="col-span-3 w-full h-full space-y-16">
          <div className="px-48">
            <PostsSearch />
          </div>
          <div className="w-full h-[75vh] space-y-32 overflow-y-auto">
            {posts.map((post) => (
              <div key={post.id} className="grid grid-cols-2 gap-8 h-96">
                <div className="h-full relative">
                  <Image
                    src={post.mainImageUrl}
                    fill
                    alt={post.title}
                    className="object-cover object-center"
                  />
                </div>
                <div className="h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <h1 className="text-5xl font-bold">{post.title}</h1>
                    <h2 className="text-darkGray text-2xl">
                      #{post.category.title}
                    </h2>
                  </div>
                  <Link
                    href="/about"
                    className={cn(
                      buttonVariants({ variant: "link" }),
                      "text-primary p-0 text-2xl font-bold w-fit"
                    )}
                  >
                    See More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
