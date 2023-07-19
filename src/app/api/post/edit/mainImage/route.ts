import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { MainImageValidator } from "@/lib/validators/image";
import { utapi } from "uploadthing/server";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { postId, newImageKey, newImageUrl, oldImageKey } =
      MainImageValidator.parse(body);

    await utapi.deleteFiles(oldImageKey);

    await db.post.update({
      where: {
        id: postId
      }, 
      data: {
        mainImageUrl: newImageUrl,
        mainImageKey: newImageKey
      }
    })

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", {status: 422})
    }

    return new Response("Could not remove category, please try again later.", {status: 500});
  }
}
