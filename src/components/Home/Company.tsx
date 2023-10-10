"use client";
import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, buttonVariants } from "../ui/Button";

const Company = () => {
  const firstDivRef = useRef<HTMLDivElement | null>(null);
  const secondDivRef = useRef<HTMLDivElement | null>(null);
  const thirdDivRef = useRef<HTMLDivElement | null>(null);

  const [current, setCurrent] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevCurrent) => (prevCurrent % 3) + 1);
    }, 10000); // 10 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="py-32 my-16 bg-black relative overflow-hidden">
      <h1 className="text-5xl font-bold text-center text-white px-4 leading-[4.5rem]">
        Sobre a <span className=" bg-primary">Empresa</span>
      </h1>
      <div className="container grid lg:grid-cols-2 gap-32 pt-16 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl text-white">
            Uma Empresa{" "}
            <span className="font-bold">
              Comprometida <br /> com a{" "}
              <span className="text-primary">Excelência</span>
            </span>
          </h2>
          <p className="text-lightGray font-bold text-xl">
            Fundada em 1983 por Joaquim António Nogueira da Hora, a Norasil é
            uma empresa de construção civil.
          </p>
          <p className="text-lightGray text-lg">
            Este empresa especializou-se em diversas áreas e adquiriu os meios
            necessários para atingir um volume de negócios anual superior a 20
            milhões de euros.
          </p>
          <h3 className="text-lightGray text-lg">
            Para continuar a ler ...{" "}
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-primary font-semibold p-2"
              )}
            >
              Sobre nós
            </Link>
          </h3>
        </div>

        <div className="z-10 flex flex-col items-center gap-8 mx-4">
          <div className="relative h-[25vh] sm:h-[35vh] max-w-[600px] p-4 w-full flex justify-center">
            <div
              ref={firstDivRef}
              className={cn(
                "transition-all ease-in duration-300 w-full h-full absolute transform",
                {
                  "rotate-0 z-30": current === 1,
                  "-rotate-6 z-10": current === 2,
                  "rotate-6 z-20": current === 3,
                }
              )}
            >
              <Image
                src="/assets/images/company/pic1.webp"
                alt="Company 1"
                fill
                className="object-cover object-center"
              />
            </div>
            <div
              ref={secondDivRef}
              className={cn(
                "transition-all ease-in duration-300 w-full h-full absolute transform",
                {
                  "rotate-6 z-20": current === 1,
                  "rotate-0 z-30": current === 2,
                  "-rotate-6 z-10": current === 3,
                }
              )}
            >
              <Image
                src="/assets/images/company/pic2.webp"
                alt="Company 2"
                fill
                className="object-cover object-center"
              />
            </div>
            <div
              ref={thirdDivRef}
              className={cn(
                "transition-all ease-in duration-300 h-full w-full absolute transform",
                {
                  "-rotate-6 z-10": current === 1,
                  "rotate-6 z-20": current === 2,
                  "rotate-0 z-30": current === 3,
                }
              )}
            >
              <Image
                src="/assets/images/company/pic3.webp"
                alt="Company 3"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
          <div className="z-40">
            <Button
              onClick={() => setCurrent(1)}
              className="p-0 bg-transparent focus:ring-0"
            >
              <Dot
                className={cn(
                  "w-12 h-12 text-darkGray hover:text-primary scale-110 transition",
                  {
                    "text-primary": current === 1,
                  }
                )}
              />
            </Button>
            <Button
              onClick={() => setCurrent(2)}
              className="p-0 bg-transparent focus:ring-0"
            >
              <Dot
                className={cn(
                  "w-12 h-12 text-darkGray hover:text-primary scale-110 transition",
                  {
                    "text-primary": current === 2,
                  }
                )}
              />
            </Button>
            <Button
              onClick={() => setCurrent(3)}
              className="p-0 bg-transparent focus:ring-0"
            >
              <Dot
                className={cn(
                  "w-12 h-12 text-darkGray hover:text-primary scale-110 transition",
                  {
                    "text-primary": current === 3,
                  }
                )}
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="h-[600px] w-[600px] text-primary hidden lg:block absolute -top-48 -right-48 border-[20px] border-primary rounded-full" />
    </div>
  );
};

export default Company;
