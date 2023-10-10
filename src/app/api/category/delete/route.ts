import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { DeleteCategoryValidator } from "@/lib/validators/category";
import { utapi } from "uploadthing/server";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if(!session?.user) {
      return new Response("Unauthorized", {status: 401});
    }
    const body = await req.json();
    const {id, imageKey} = DeleteCategoryValidator.parse(body);

    const posts = await db.post.findFirst({where: {
      categoryId: id
    }});

    if (posts) {
      return new Response("Category has posts, cannot delete.", { status: 400 });
    }

    await db.category.delete({
      where: {
        id
      }
    })

    await utapi.deleteFiles(imageKey);

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", {status: 422})
    }

    return new Response("Could not remove category, please try again later.", {status: 500});
  }
}