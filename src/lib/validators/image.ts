import { z } from "zod";

const imageMaxSize = 5 * 1024 * 1024; // 5MB
const allowedImageFormats = ["image/jpeg", "image/png", "image/webp"]; // Add more formats as needed

const fileSchema = z
  .any()
  .refine((file) => file.size <= imageMaxSize, {
    message: `Please select a file up to ${imageMaxSize / (1024 * 1024)}MB in size.`,
    path: [],
  })
  .refine((file) => allowedImageFormats.includes(file.type), {
    message: "Please select a valid image file (JPEG, PNG, WEBP).",
    path: [],
  });

export const MainImageFormValidator = z.object({
  newImage: fileSchema,
});

export const ImagesFormValidator = z.object({
  newImages: z.array(fileSchema),
});

export const MainImageValidator = z.object({
  newImageUrl: z.string().url(),
  newImageKey: z.string(),
  oldImageKey: z.string(),
  postId: z.string(),
});

export const ImagesValidator = z.object({
  newImages: z.array(z.object({
    url: z.string().url(),
    key: z.string()
  })),
  postId: z.string()
});

export const DeleteImageValidator = z.object({
  id: z.string(),
  imageKey: z.string()
});

export type MainImageFormRequest = z.infer<typeof MainImageFormValidator>;
export type ImagesFormRequest = z.infer<typeof ImagesFormValidator>;
export type MainImageRequest = z.infer<typeof MainImageValidator>;
export type ImagesRequest = z.infer<typeof ImagesValidator>;
export type DeleteImageRequest = z.infer<typeof DeleteImageValidator>;
