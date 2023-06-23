import { z } from "zod";

export const EmailValidator = z.object({
  email: z.string().email()
})

export type EmailRequest = z.infer<typeof EmailValidator>