"use client";
import { toast } from "@/hooks/use-toast";
import { uploadFiles } from "@/lib/uploadthing";
import {
  MainImageFormRequest,
  MainImageFormValidator,
  MainImageRequest,
} from "@/lib/validators/image";
import { ExtendedPost } from "@/types/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { AspectRatio } from "../ui/AspectRatio";
import { Button } from "../ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/Form";
import { Input } from "../ui/Input";

interface PostMainImageFormProps {
  post: ExtendedPost;
}

const PostMainImageForm: FC<PostMainImageFormProps> = ({ post }) => {
  const router = useRouter();
  const form = useForm<MainImageFormRequest>({
    resolver: zodResolver(MainImageFormValidator),
    defaultValues: {
      newImage: undefined,
    },
  });

  const { mutate: changeMainImage, isLoading } = useMutation({
    mutationFn: async ({ newImage }: MainImageFormRequest) => {
      const [res] = await uploadFiles([newImage], "imageUploader");

      const payload: MainImageRequest = {
        postId: post.id,
        newImageKey: res.fileKey,
        newImageUrl: res.fileUrl,
        oldImageKey: post.mainImageKey,
      };

      const { data } = await axios.patch("/api/post/edit/mainImage", payload);
      return data;
    },
    onError: () => {
      toast({
        title: "There was an error.",
        description: "Could not change main image.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "The main image has been changed.",
      });
      router.refresh();
    },
  });

  return (
    <div className="grid gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => {
            changeMainImage(e);
          })}
          className="flex w-full max-w-sm items-center space-x-2"
        >
          <FormField
            control={form.control}
            name="newImage"
            render={({ field }) => (
              <FormItem>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
      <div className="grid lg:grid-cols-3 w-full">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={post.mainImageUrl}
            alt={post.title}
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </div>
    </div>
  );
};

export default PostMainImageForm;
