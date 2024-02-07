import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { EditCategoryValidator } from "@/lib/validators/category";
import { del } from "@vercel/blob";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if(!session?.user) {
      return new Response("Unauthorized", {status: 401});
    }
    const body = await req.json();
    const {id, imageUrl, oldImageUrl, name, title} = EditCategoryValidator.parse(body);

    const existingCategory = await db.category.findFirst({
      where: {
        name,
      },
    });

    if (existingCategory && existingCategory.id != id) {
      return new Response("Category already exists", { status: 409 });
    }
    
    await db.category.update({
      where: {
        id
      },
      data: {
        title,
        name,
        imageUrl,
      }
    })

    if(oldImageUrl != imageUrl) {
    await del(oldImageUrl);
    }

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", {status: 422})
    }

    return new Response("Could not edit category, please try again later.", {status: 500});
  }
}