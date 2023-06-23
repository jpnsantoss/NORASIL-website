"use client";

import { toast } from "@/hooks/use-toast";
import { uploadFiles } from "@/lib/uploadthing";
import {
  CategoryFormRequest,
  CategoryFormValidator,
  CategoryRequest,
  CategoryValidator,
} from "@/lib/validators/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";

const CategoriesForm = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CategoryFormRequest>({
    resolver: zodResolver(CategoryFormValidator),
    defaultValues: {
      title: "",
      image: null,
    },
  });

  const { mutate: createCategory, isLoading } = useMutation({
    mutationFn: async ({ title, image }: CategoryFormRequest) => {
      const [res] = await uploadFiles([image[0]], "imageUploader");
      const payload: CategoryRequest = {
        title,
        image: res.fileUrl,
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
    <form
      className="space-y-4 my-4"
      onSubmit={handleSubmit((e) => {
        createCategory(e);
      })}
    >
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Name"
          {...register("title")}
        />
        {errors?.title && (
          <p className="px-1 text-xs text-red-600">{errors.title.message}</p>
        )}
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" {...register("image")} />
        {errors?.image && (
          <p className="px-1 text-xs text-red-600">
            {errors.image.message?.toString()}
          </p>
        )}
      </div>

      <Button className="px-8" isLoading={isLoading}>
        Create
      </Button>
    </form>
  );
};

export default CategoriesForm;
