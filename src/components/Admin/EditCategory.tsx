"use client";

import { toast } from "@/hooks/use-toast";
import {
  EditCategoryFormRequest,
  EditCategoryFormValidator,
  EditCategoryRequest,
} from "@/lib/validators/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { upload } from "@vercel/blob/client";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { AspectRatio } from "../ui/AspectRatio";
import { Button } from "../ui/Button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
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
import { Label } from "../ui/Label";
import { Separator } from "../ui/Separator";

interface EditCategoryProps {
  category: Category;
}

const EditCategory: FC<EditCategoryProps> = ({ category }) => {
  const router = useRouter();
  const form = useForm<EditCategoryFormRequest>({
    resolver: zodResolver(EditCategoryFormValidator),
    defaultValues: {
      title: category.title,
      image: undefined,
    },
  });

  const { mutate: editCategory, isPending } = useMutation({
    mutationFn: async ({ title, image }: EditCategoryFormRequest) => {
      let imageUrl;

      if (image) {
        const blob = await upload(image.name, image, {
          access: "public",
          handleUploadUrl: "/api/upload",
        });
        imageUrl = blob.url;
      } else {
        imageUrl = category.imageUrl;
      }

      const payload: EditCategoryRequest = {
        name: title
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s/g, "")
          .toLowerCase(),
        title,
        oldImageUrl: category.imageUrl,
        imageUrl: imageUrl,
        id: category.id,
      };

      const { data } = await axios.patch("/api/category/edit", payload);
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
        description: "Could not edit category.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "The category has been edited.",
      });
      router.refresh();
    },
  });

  return (
    <DialogContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => {
            editCategory(e);
          })}
          className="space-y-8"
        >
          <DialogHeader>
            <DialogTitle>Edit {category.title}</DialogTitle>
            <DialogDescription>
              Make changes to the category here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 justify-center">
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
            <Separator />
            <div className="w-96">
              <Label>Current image</Label>
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <Image
                  src={category.imageUrl}
                  alt={`${category.title} Picture`}
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </div>
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
          </div>
          <DialogFooter>
            <Button type="submit" isLoading={isPending}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default EditCategory;
