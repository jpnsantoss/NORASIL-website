import { getAuthSession } from "@/lib/auth";
import db from "@/lib/db";
import { DeletePostValidator } from "@/lib/validators/post";
import { del } from "@vercel/blob";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { id, images, mainImageUrl } = DeletePostValidator.parse(body);

    await db.post.delete({
      where: {
        id,
      },
    });

    await del(mainImageUrl);

    images.map(async (image) => {
      await del(image.url);
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not remove post, please try again later.", {
      status: 500,
    });
  }
}
