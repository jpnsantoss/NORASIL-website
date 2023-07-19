"use client";
import { toast } from "@/hooks/use-toast";
import { uploadFiles } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import {
  DeleteImageRequest,
  ImagesFormRequest,
  ImagesFormValidator,
  ImagesRequest,
} from "@/lib/validators/image";
import { ExtendedPost } from "@/types/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image as PrismaImage } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/AlertDialog";
import { AspectRatio } from "../ui/AspectRatio";
import { Button, buttonVariants } from "../ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/Form";
import { Input } from "../ui/Input";

interface PostImagesFormProps {
  post: ExtendedPost;
}

const PostImagesForm: FC<PostImagesFormProps> = ({ post }) => {
  const router = useRouter();

  const form = useForm<ImagesFormRequest>({
    resolver: zodResolver(ImagesFormValidator),
    defaultValues: {
      newImages: undefined,
    },
  });

  const { mutate: addImage, isLoading } = useMutation({
    mutationFn: async ({ newImages }: ImagesFormRequest) => {
      let imageResults: any = [];
      if (newImages && newImages.length > 0) {
        const imageUploadPromises = newImages.map(async (image) => {
          const [res] = await uploadFiles([image], "imageUploader");
          return { url: res.fileUrl, key: res.fileKey };
        });

        imageResults = await Promise.all(imageUploadPromises);
      }

      const payload: ImagesRequest = {
        newImages: imageResults,
        postId: post.id,
      };

      const { data } = await axios.post("/api/post/edit/images", payload);
      return data;
    },
    onError: (err) => {
      toast({
        title: "There was an error.",
        description: "Could not add images.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "The images have been added.",
      });
      router.refresh();
    },
  });

  //delete image
  const { mutate: deleteImage, isLoading: deletingImage } = useMutation({
    mutationFn: async ({ id, imageKey }: DeleteImageRequest) => {
      const payload: DeleteImageRequest = {
        id,
        imageKey,
      };
      const { data } = await axios.patch("/api/post/edit/images", payload);
      return data;
    },
    onError: () => {
      return toast({
        title: "Something went wrong",
        description: "Image wasn't removed successfully, please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      return toast({
        description: "Image was removed successfully.",
      });
    },
  });

  return (
    <div className="grid gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => {
            addImage(e);
          })}
          className="flex w-full max-w-sm items-center space-x-2"
        >
          <FormField
            control={form.control}
            name="newImages"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      field.onChange(files);
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
            Add
          </Button>
        </form>
      </Form>

      {deletingImage ? (
        <div className="flex items-center justify-center h-48 p-8">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {post.images.map((image: PrismaImage) => (
            <div key={post.id} className="w-full relative">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={image.url}
                  alt={post.title}
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
              <div className="absolute right-0 top-0">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <div
                      className={cn(
                        buttonVariants({ variant: "destructive", size: "xs" }),
                        "bg-black/40"
                      )}
                    >
                      <X className="w-4 h-4 text-white" />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this image.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          deleteImage({
                            id: image.id,
                            imageKey: image.key,
                          })
                        }
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostImagesForm;
