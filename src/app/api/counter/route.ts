import { getAuthSession } from "@/lib/auth";
import { acceleratedDb } from "@/lib/db";
import { CounterValidator } from "@/lib/validators/counter";
import { EditPostValidator } from "@/lib/validators/post";
import { z } from "zod";

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { finishedBuilds, constructionBuilds, awards } =
      CounterValidator.parse(body);

    const counter = await acceleratedDb.counter.findFirst();
    await acceleratedDb.counter.update({
      where: {
        id: counter?.id,
      },
      data: {
        finishedBuilds,
        constructionBuilds,
        awards,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could not update counter, please try again later.", {
      status: 500,
    });
  }
}
