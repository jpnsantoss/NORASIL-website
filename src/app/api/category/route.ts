import { getAuthSession } from "@/lib/auth";
import { acceleratedDb } from "@/lib/db";
import { CategoryValidator } from "@/lib/validators/category";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { name, title, imageUrl } = CategoryValidator.parse(body);

    const category = await acceleratedDb.category.findFirst({
      where: {
        name,
      },
    });
    if (category) {
      return new Response("Category already exists", { status: 409 });
    }

    await acceleratedDb.category.create({
      data: {
        title,
        imageUrl,
        name,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could create category, please try again later.", {
      status: 500,
    });
  }
}
