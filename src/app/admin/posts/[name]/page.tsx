import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { FC } from "react";

interface pageProps {
  params: {
    name: string;
  };
}

const Page = async ({ params }: pageProps) => {
  const { name } = params;

  const post = await db.post.findFirst({
    where: { name },
    include: {
      category: true,
      images: true,
    },
  });

  if (!post) return notFound();

  return (
    <div>
      <h1>{post.title}</h1>
    </div>
  );
};

export default Page;
