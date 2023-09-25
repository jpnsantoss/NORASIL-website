import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const categoryName = url.searchParams.get("category");
  const typeParam = url.searchParams.get("status")?.toUpperCase();
  
  let postQuery: {
    where: {
      categoryId?: string; // Optional category filter
      type?: "CONSTRUCTION" | "FINISHED"; // Optional type filter
    };
    include: {
      category: boolean;
    };
    orderBy: {
      createdAt: "asc" | "desc" | undefined; // Make sure it matches the type expected by db.post.findMany
    };
    take: number;
  } = {
    where: {},
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS
  };

  // Validate and convert the type parameter if provided
  if (typeParam && (typeParam === "CONSTRUCTION" || typeParam === "FINISHED")) {
    postQuery.where.type = typeParam;
  }

  // If both category and type are provided
  if (categoryName) {
    const category = await db.category.findFirst({
      where: {
        name: categoryName,
      },
    });

    if (category) {
      postQuery.where.categoryId = category.id;
    }
  }
  // If only category is provided
  else if (categoryName) {
    const category = await db.category.findFirst({
      where: {
        name: categoryName,
      },
    });

    if (category) {
      postQuery.where.categoryId = category.id;
    }
  }

  const results = await db.post.findMany(postQuery);
  return new Response(JSON.stringify(results));
}
