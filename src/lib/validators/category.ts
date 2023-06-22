const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

import { z } from "zod";

export const CategoryFormValidator = z.object({
  title: z.string().min(3).max(32),
  image: z
  .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
})

export const CategoryValidator = z.object({
  title: z.string().min(3).max(32),
  image: z.string().url()
})

export type CategoryFormRequest = z.infer<typeof CategoryFormValidator>
export type CategoryRequest = z.infer<typeof CategoryValidator>
