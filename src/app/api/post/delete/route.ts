import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { DeletePostValidator } from "@/lib/validators/post";
import { utapi } from "uploadthing/server";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if(!session?.user) {
      return new Response("Unauthorized", {status: 401});
    }
    const body = await req.json();
    const {id, images, mainImageKey} = DeletePostValidator.parse(body);

    await db.post.delete({
      where: {
        id
      }
    })

    await utapi.deleteFiles(mainImageKey);

    images.map(async (image) => {
      await utapi.deleteFiles(image.key);
    })

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", {status: 422})
    }

    return new Response("Could not remove post, please try again later.", {status: 500});
  }
}