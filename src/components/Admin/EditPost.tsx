"use client";

import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  EditPostFormRequest,
  EditPostFormValidator,
  EditPostRequest,
} from "@/lib/validators/post";
import { ExtendedPost } from "@/types/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Calendar } from "../ui/Calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

interface EditPostProps {
  post: ExtendedPost;
  categories: Category[];
}

const EditPost: FC<EditPostProps> = ({ post, categories }) => {
  const router = useRouter();

  const form = useForm<EditPostFormRequest>({
    resolver: zodResolver(EditPostFormValidator),
    defaultValues: {
      title: post.title,
      client: post.client,
      deadline: post.deadline,
      type: post.type,
      category: post.categoryId,
      date: post.date,
    },
  });

  const { mutate: editPost, isLoading } = useMutation({
    mutationFn: async ({
      title,
      category,
      deadline,
      client,
      date,
      type,
    }: EditPostFormRequest) => {
      const payload: EditPostRequest = {
        id: post.id,
        name: title
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s/g, "")
          .toLowerCase(),
        title,
        deadline,
        category,
        type,
        client,
        date: date.toISOString(),
      };

      const { data } = await axios.patch("/api/post/edit", payload);
      return data;
    },
    onError: (err) => {
      toast({
        title: "There was an error.",
        description: "Could not edit post.",
        variant: "destructive",
      });
    },
    onSuccess: (data, variables) => {
      const { title } = variables;
      toast({
        description: "The post has been edited.",
      });
      router.refresh();
      router.push(
        `/admin/posts/${title
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s/g, "")
          .toLowerCase()}`
      );
    },
  });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((e) => {
            editPost(e);
          })}
          className="space-y-8"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-8">
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
                      This is the post public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <FormControl>
                      <Input placeholder="client" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the client associated to this post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline</FormLabel>
                    <FormControl>
                      <Input placeholder="deadline" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the time taken to make the build.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-8 pt-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange({
                          target: { value },
                        } as ChangeEvent<HTMLSelectElement>)
                      }
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the current state of the build" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CONSTRUCTION">
                          In Construction
                        </SelectItem>
                        <SelectItem value="FINISHED">Finished</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can manage the post state later in the post editor.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the post category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can manage the post category later in the post editor.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Post Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"ghost"}
                            className={cn(
                              "border border-input pl-3 text-left font-normal bg-white"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(
                            day: Date | ChangeEvent<Element> | undefined
                          ) => {
                            if (day instanceof Date) {
                              field.onChange(day);
                            }
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The date from when the build was made.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditPost;
