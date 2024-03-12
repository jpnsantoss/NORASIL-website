import { getAuthSession } from "@/lib/auth";
import { acceleratedDb } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const {
      category,
      client,
      date,
      deadline,
      local,
      images,
      mainImageUrl,
      name,
      title,
      type,
    } = PostValidator.parse(body);

    const existingPost = await acceleratedDb.post.findFirst({
      where: {
        name,
      },
    });

    if (existingPost) {
      return new Response("Post already exists", { status: 409 });
    }

    const post = await acceleratedDb.post.create({
      data: {
        name,
        client,
        deadline,
        local,
        date,
        mainImageUrl,
        title,
        type,
        categoryId: category,
      },
    });

    if (images && images.length > 0) {
      await Promise.all(
        images.map(async (image) => {
          await acceleratedDb.image.create({
            data: {
              postId: post.id,
              url: image.url,
            },
          });
        })
      );
    }

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
