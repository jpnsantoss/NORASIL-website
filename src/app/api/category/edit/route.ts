import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { EditCategoryValidator } from "@/lib/validators/category";
import { utapi } from "uploadthing/server";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if(!session?.user) {
      return new Response("Unauthorized", {status: 401});
    }
    const body = await req.json();
    const {id, imageKey, imageUrl, oldImageKey, name, title} = EditCategoryValidator.parse(body);
    
    await db.category.update({
      where: {
        id
      },
      data: {
        title,
        name,
        imageUrl,
        imageKey,
      }
    })

    if(oldImageKey != imageKey) {
    await utapi.deleteFiles(oldImageKey);
    }

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", {status: 422})
    }

    return new Response("Could not edit category, please try again later.", {status: 500});
  }
}