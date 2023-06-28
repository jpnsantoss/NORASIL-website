"use client";
import { toast } from "@/hooks/use-toast";
import { uploadFiles } from "@/lib/uploadthing";
import {
  CategoryFormRequest,
  CategoryFormValidator,
  CategoryRequest,
  EditCategoryFormRequest,
  EditCategoryFormValidator,
  EditCategoryRequest,
} from "@/lib/validators/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
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
  DialogTrigger,
} from "../ui/Dialog";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Separator } from "../ui/Separator";

interface EditCategoryProps {
  category: Category;
}

const EditCategory: FC<EditCategoryProps> = ({ category }) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EditCategoryFormRequest>({
    resolver: zodResolver(EditCategoryFormValidator),
    defaultValues: {
      title: category.title,
      image: null,
    },
  });

  const { mutate: editCategory, isLoading } = useMutation({
    mutationFn: async ({ title, image }: EditCategoryFormRequest) => {
      let res: { fileUrl: string; fileKey: string } = {
        fileUrl: "",
        fileKey: "",
      };

      if (image) {
        const [uploadRes] = await uploadFiles([image[0]], "imageUploader");
        res = uploadRes;
      } else {
        res = {
          fileUrl: category.imageUrl,
          fileKey: category.imageKey,
        };
      }

      const payload: EditCategoryRequest = {
        name: title
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s/g, "")
          .toLowerCase(),
        title,
        imageUrl: res.fileUrl,
        imageKey: res.fileKey,
        id: category.id,
        oldImageKey: category.imageKey,
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
        description: "Could not create category.",
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
    <DialogContent className="">
      <form
        onSubmit={handleSubmit((e) => {
          editCategory(e);
        })}
      >
        <DialogHeader>
          <DialogTitle>Edit {category.title}</DialogTitle>
          <DialogDescription>
            Make changes to the category here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 justify-center">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="title"
              type="text"
              placeholder="Name"
              {...register("title")}
            />
            {errors?.title && (
              <p className="px-1 text-xs text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>
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
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Change Picture</Label>
            <Input id="picture" type="file" {...register("image")} />
            {errors?.image && (
              <p className="px-1 text-xs text-red-600">
                {errors.image.message?.toString()}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default EditCategory;
