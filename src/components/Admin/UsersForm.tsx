"use client";

import { toast } from "@/hooks/use-toast";
import { EmailRequest, EmailValidator } from "@/lib/validators/email";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

const UsersForm = () => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EmailRequest>({
    resolver: zodResolver(EmailValidator),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: authorizeUser, isPending } = useMutation({
    mutationFn: async ({ email }: EmailRequest) => {
      const payload: EmailRequest = {
        email,
      };

      const { data } = await axios.post("/api/user", payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "User is already authorized.",
            description: "Please choose a different email.",
            variant: "destructive",
          });
        }
      }
      toast({
        title: "There was an error.",
        description: "Could not authorize user.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "The user has been authorized.",
      });
      router.refresh();
    },
  });
  return (
    <>
      <form
        className="flex space-x-2"
        onSubmit={handleSubmit((e) => {
          authorizeUser(e);
        })}
      >
        <Input type="email" placeholder="Email" {...register("email")} />
        <Button className="shrink-0" isLoading={isPending}>
          Add
        </Button>
      </form>
      {errors?.email && (
        <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
      )}
    </>
  );
};

export default UsersForm;
