import { getAuthSession } from "@/lib/auth";
import { acceleratedDb } from "@/lib/db";
import { EditPostValidator } from "@/lib/validators/post";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { id, name, title, type, category, client, date, deadline, local } =
      EditPostValidator.parse(body);

    await acceleratedDb.post.update({
      where: {
        id,
      },
      data: {
        name,
        title,
        type,
        categoryId: category,
        client,
        date,
        deadline,
        local,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not edit category, please try again later.", {
      status: 500,
    });
  }
}
