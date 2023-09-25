"use client";

import { toast } from "@/hooks/use-toast";
import { uploadFiles } from "@/lib/uploadthing";
import {
  CategoryFormRequest,
  CategoryFormValidator,
  CategoryRequest,
} from "@/lib/validators/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Input } from "../ui/Input";

const CategoriesForm = () => {
  const router = useRouter();

  const form = useForm<CategoryFormRequest>({
    resolver: zodResolver(CategoryFormValidator),
    defaultValues: {
      title: "",
      image: undefined,
    },
  });

  const { mutate: createCategory, isLoading } = useMutation({
    mutationFn: async ({ title, image }: CategoryFormRequest) => {
      const [res] = await uploadFiles([image], "imageUploader");
      const payload: CategoryRequest = {
        name: title
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s/g, "")
          .toLowerCase(),
        title,
        imageUrl: res.fileUrl,
        imageKey: res.fileKey,
      };

      const { data } = await axios.post("/api/category", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Category already exists.",
            description: "Please choose a different name.",
            variant: "destructive",
          });
        }
      }
      toast({
        title: "There was an error.",
        description: "Could not create category.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "The category has been created.",
      });
      router.refresh();
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((e) => {
          createCategory(e);
        })}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <FormDescription>
                This is the category public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    field.onChange(file as File);
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </FormControl>
              <FormDescription>
                This is the image associated with this category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shadow-btn" isLoading={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CategoriesForm;
