import { getAuthSession } from "@/lib/auth";
import { acceleratedDb } from "@/lib/db";
import { DeleteImageValidator, ImagesValidator } from "@/lib/validators/image";
import { del } from "@vercel/blob";
import { z } from "zod";

//add images
export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { newImages: images, postId } = ImagesValidator.parse(body);

    await Promise.all(
      images.map(async (image) => {
        await acceleratedDb.image.create({
          data: {
            postId,
            url: image.url,
          },
        });
      })
    );

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could create post, please try again later.", {
      status: 500,
    });
  }
}

//delete image

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { id, imageUrl } = DeleteImageValidator.parse(body);

    await acceleratedDb.image.delete({
      where: {
        id,
      },
    });

    await del(imageUrl);

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not remove image, please try again later.", {
      status: 500,
    });
  }
}
