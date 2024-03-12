import db from "@/lib/db";
import { z } from "zod";

interface PostQuery {
  take: number;
  skip: number;
  orderBy: {
    createdAt: "asc" | "desc" | undefined;
  };
  include: {
    category: boolean;
    images: boolean;
  };
  where?: {
    categoryId?: string;
    type?: "CONSTRUCTION" | "FINISHED";
  };
  cacheStrategy: { ttl: number };
}

// Shared function to handle infinite scrolling with filters
async function handleInfiniteScroll(
  req: Request,
  categoryName: string,
  typeParam: string
) {
  const url = new URL(req.url);

  const { limit, page } = z
    .object({
      limit: z.string(),
      page: z.string(),
    })
    .parse({
      limit: url.searchParams.get("limit"),
      page: url.searchParams.get("page"),
    });

  let postQuery: PostQuery = {
    take: parseInt(limit),
    skip: (parseInt(page) - 1) * parseInt(limit),
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      images: true,
    },
    cacheStrategy: { ttl: 60 },
  };

  // Apply filters
  if (categoryName) {
    const category = await db.category.findFirst({
      where: {
        name: categoryName,
      },
    });

    if (category) {
      postQuery.where = {
        categoryId: category.id,
      };
    }
  }

  if (typeParam && (typeParam === "CONSTRUCTION" || typeParam === "FINISHED")) {
    postQuery.where = {
      ...postQuery.where,
      type: typeParam,
    };
  }

  const posts = await db.post.findMany(postQuery);
  return new Response(JSON.stringify(posts));
}

// Route for infinite scrolling with filters
export async function GET(req: Request) {
  const url = new URL(req.url);

  const { categoryName, typeParam } = z
    .object({
      categoryName: z.string(),
      typeParam: z.string(),
    })
    .parse({
      categoryName: url.searchParams.get("category"),
      typeParam: url.searchParams.get("status"),
    });

  try {
    return await handleInfiniteScroll(req, categoryName, typeParam);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not fetch more posts", {
      status: 500,
    });
  }
}
