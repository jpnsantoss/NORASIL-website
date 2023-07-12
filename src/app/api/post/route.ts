import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if(!session?.user) {
      return new Response("Unauthorized", {status: 401});
    }

    const body = await req.json();

    const {category, client, date, images, mainImageKey, mainImageUrl, name, title, type} = PostValidator.parse(body);

    const existingPost = await db.post.findFirst({
      where: {
        name
      }
    })

    if(existingPost) {
      return new Response("Post already exists", {status: 409});
    }

    const post = await db.post.create({
      data: {
        name,
        client,
        date,
        mainImageUrl,
        mainImageKey,
        title,
        type,
        categoryId: category,
      }
    })

    if (images && images.length > 0) {
      images.map((image) =>
        db.image.create({
          data: {
            url: image.url,
            key: image.key,
            postId: post.id,
          },
        })
      );
    }

    return new Response("OK");
  } catch(error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", {status: 422})
    }

    return new Response("Could create post, please try again later.", {status: 500});
  }
}