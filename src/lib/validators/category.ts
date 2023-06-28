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
  name: z.string(),
  title: z.string().min(3).max(32),
  imageUrl: z.string().url(),
  imageKey: z.string()
})

export const DeleteCategoryValidator = z.object({
  id: z.string(),
  imageKey: z.string(),
})

export const EditCategoryFormValidator = z.object({
  title: z.string().min(3).max(32),
  image: z
    .any()
    .nullable()
    .refine((files) => files === null || files?.length === 1, "Image is required.")
    .refine((files) => files === null || files?.[0]?.size <= MAX_FILE_SIZE, "Max file size is 5MB.")
    .refine(
      (files) => files === null || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});


export const EditCategoryValidator = z.object({
  id: z.string(),
  oldImageKey: z.string(),
  name: z.string(),
  title: z.string().min(3).max(32),
  imageUrl: z.string().url(),
  imageKey: z.string()
})


export type CategoryFormRequest = z.infer<typeof CategoryFormValidator>
export type CategoryRequest = z.infer<typeof CategoryValidator>
export type DeleteCategoryRequest = z.infer<typeof DeleteCategoryValidator>
export type EditCategoryFormRequest = z.infer<typeof EditCategoryFormValidator>
export type EditCategoryRequest = z.infer<typeof EditCategoryValidator>
