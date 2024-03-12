import { getAuthSession } from "@/lib/auth";
import { acceleratedDb } from "@/lib/db";
import { EmailValidator } from "@/lib/validators/email";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { email } = EmailValidator.parse(body);

    const authorizedEmail = await acceleratedDb.authorizedEmail.findFirst({
      where: {
        email,
      },
    });

    if (authorizedEmail) {
      return new Response("Email already authorized", { status: 409 });
    }

    await acceleratedDb.authorizedEmail.create({
      data: {
        email,
      },
    });
    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could authorize user, please try again later.", {
      status: 500,
    });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { email } = EmailValidator.parse(body);

    await acceleratedDb.authorizedEmail.deleteMany({
      where: {
        email,
      },
    });

    await acceleratedDb.user.deleteMany({
      where: {
        email,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }

    return new Response("Could remove user, please try again later.", {
      status: 500,
    });
  }
}
