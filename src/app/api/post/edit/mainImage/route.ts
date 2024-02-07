import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { MainImageValidator } from "@/lib/validators/image";
import { del } from "@vercel/blob";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { postId, newImageUrl, oldImageUrl } =
      MainImageValidator.parse(body);

    await del(oldImageUrl);

    await db.post.update({
      where: {
        id: postId
      }, 
      data: {
        mainImageUrl: newImageUrl,
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
