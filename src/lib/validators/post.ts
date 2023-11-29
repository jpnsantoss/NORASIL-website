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

export const PostFormValidator = z.object({
  title: z.string().min(1),
  client: z.string().min(1),
  deadline: z.string().min(1),
  local: z.string().min(1),
  type: z.enum(["CONSTRUCTION", "FINISHED"], {
    required_error: "Please select a valid type.",
  }),
  category: z.string({
    required_error: "Please select a valid category.",
  }),
  date: z.date({
    required_error: "Please select a valid post date.",
  }),
  mainImage: fileSchema,
  images: z.array(fileSchema).optional(),
});


export const PostValidator = z.object({
  name: z.string(),
  title: z.string(),
  client: z.string(),
  deadline: z.string(),
  local: z.string(),
  type: z.enum(["CONSTRUCTION", "FINISHED"]),
  category: z.string(),
  date: z.string().datetime(),
  mainImageUrl: z.string().url(),
  mainImageKey: z.string(),
  images: z.array(z.object({
    url: z.string().url(),
    key: z.string()
  }))
});

export const DeletePostValidator = z.object({
  id: z.string(),
  mainImageKey: z.string(),
  images: z.array(z.object({
    url: z.string().url(),
    key: z.string()
  }))
})

export const EditPostFormValidator = z.object({
  title: z.string().min(1),
  client: z.string().min(1),
  deadline: z.string().min(1),
  local: z.string().min(1),
  type: z.enum(["CONSTRUCTION", "FINISHED"], {
    required_error: "Please select a valid type.",
  }),
  category: z.string({
    required_error: "Please select a valid category.",
  }),
  date: z.date({
    required_error: "Please select a valid post date.",
  }),
});

export const EditPostValidator = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  client: z.string(),
  deadline: z.string(),
  local: z.string(),
  type: z.enum(["CONSTRUCTION", "FINISHED"]),
  category: z.string(),
  date: z.string().datetime(),
});

export type PostFormRequest = z.infer<typeof PostFormValidator>;
export type PostRequest = z.infer<typeof PostValidator>;
export type DeletePostRequest = z.infer<typeof DeletePostValidator>;
export type EditPostFormRequest = z.infer<typeof EditPostFormValidator>;
export type EditPostRequest = z.infer<typeof EditPostValidator>;