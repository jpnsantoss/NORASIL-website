import type { Category, Post } from "@prisma/client";

export type ExtendedPost = Post & {
  category: Category;
  images: Image[];
};
