"use client";

import { toast } from "@/hooks/use-toast";
import { CounterRequest, CounterValidator } from "@/lib/validators/counter";
import { EmailRequest, EmailValidator } from "@/lib/validators/email";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

import { Counter } from "@prisma/client";
import { FC } from "react";
import { Label } from "../ui/Label";

interface CounterFormProps {
  counter: Counter;
}

const CounterForm: FC<CounterFormProps> = ({ counter }) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CounterRequest>({
    resolver: zodResolver(CounterValidator),
    defaultValues: {
      finishedBuilds: counter.finishedBuilds,
      constructionBuilds: counter.constructionBuilds,
      awards: counter.awards,
    },
  });

  const { mutate: updateCounter, isLoading } = useMutation({
    mutationFn: async ({
      finishedBuilds,
      constructionBuilds,
      awards,
    }: CounterRequest) => {
      const payload: CounterRequest = {
        finishedBuilds,
        constructionBuilds,
        awards,
      };

      const { data } = await axios.patch("/api/counter", payload);
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
        className="flex flex-col gap-4 items-end"
        onSubmit={handleSubmit((e) => {
          updateCounter(e);
        })}
      >
        <div className="flex gap-2">
          <div>
            <Label>Obras finalizadas</Label>
            <Input
              type="text"
              placeholder="Obras finalizadas"
              {...register("finishedBuilds")}
            />
          </div>
          <div>
            <Label>Obras em curso</Label>
            <Input
              type="text"
              placeholder="Obras em curso"
              {...register("constructionBuilds")}
            />
          </div>
          <div>
            <Label>Prémios </Label>
            <Input type="text" placeholder="Prémios" {...register("awards")} />
          </div>
        </div>
        <Button className="shrink-0 " isLoading={isLoading}>
          Update
        </Button>
      </form>
    </>
  );
};

export default CounterForm;
