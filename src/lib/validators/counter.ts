import { z } from "zod";

export const CounterValidator = z.object({
  finishedBuilds: z.string(),
  constructionBuilds: z.string(),
  awards: z.string(),
});

export type CounterRequest = z.infer<typeof CounterValidator>;
