import { z } from "zod";

const imageMaxSize = 5 * 1024 * 1024; // 5MB
const allowedImageFormats = ["image/jpeg", "image/png", "image/gif"]; // Add more formats as needed

const fileSchema = z
  .instanceof(File, {message: "Please select a valid main image file."})
  .refine((file) => file.size <= imageMaxSize, {
    message: `Please select a file up to ${imageMaxSize / (1024 * 1024)}MB in size.`,
    path: [],
  })
  .refine((file) => allowedImageFormats.includes(file.type), {
    message: "Please select a valid image file (JPEG, PNG, GIF).",
    path: [],
  });

export const PostFormValidator = z.object({
  title: z.string().nonempty(
    "Please provide a valid title.",
  ),
  client: z.string().nonempty("Please provide the client's name.",
  ),
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

export type PostFormRequest = z.infer<typeof PostFormValidator>;
export type PostRequest = z.infer<typeof PostValidator>;