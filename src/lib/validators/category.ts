import { z } from "zod";

const imageMaxSize = 50 * 1024 * 1024; // 5MB
const allowedImageFormats = ["image/jpeg", "image/png", "image/webp"]; // Add more formats as needed

const fileSchema = z
  .any()
  .refine((file) => file.size <= imageMaxSize, {
    message: `Please select a file up to ${imageMaxSize / (1024 * 1024)}MB in size.`,
    path: [],
  })
  .refine((file) => allowedImageFormats.includes(file.type), {
    message: "Please select a valid image file (JPEG, PNG, GIF).",
    path: [],
  });

export const CategoryFormValidator = z.object({
  title: z.string().nonempty("Please provide a valid title."),
  image: fileSchema,
});

export const CategoryValidator = z.object({
  name: z.string(),
  title: z.string(),
  imageUrl: z.string().url(),
});

export const DeleteCategoryValidator = z.object({
  id: z.string(),
  imageUrl: z.string().url(),
});

export const EditCategoryFormValidator = z.object({
  title: z.string().nonempty("Please provide a valid title."),
  image: fileSchema.optional(),
});

export const EditCategoryValidator = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  imageUrl: z.string().url(),
  oldImageUrl: z.string().url(),
});

export type CategoryFormRequest = z.infer<typeof CategoryFormValidator>;
export type CategoryRequest = z.infer<typeof CategoryValidator>;
export type DeleteCategoryRequest = z.infer<typeof DeleteCategoryValidator>;
export type EditCategoryFormRequest = z.infer<typeof EditCategoryFormValidator>;
export type EditCategoryRequest = z.infer<typeof EditCategoryValidator>;
