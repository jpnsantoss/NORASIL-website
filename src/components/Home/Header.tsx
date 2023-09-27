"use client";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Link from "next/link";
import Navbar from "../Navbar";
import { buttonVariants } from "../ui/Button";

const inter = Inter({ subsets: ["latin"] });
const Header = () => {
  return (
    <div className="w-full h-full lg:min-h-[900px] overflow-hidden">
      <div className="w-full absolute left-0 top-0 z-20">
        <div className="relative w-full">
          <Navbar />
          <div className="lg:py-12 px-4 lg:px-48">
            <div className="flex flex-col gap-4">
              <h1
                className={cn(
                  inter.className,
                  "text-5xl lg:text-7xl font-extrabold leading-[4rem] lg:leading-[5rem]"
                )}
              >
                40 anos <br /> de{" "}
                <span className="text-primary"> excelência</span> <br />
                na construção
              </h1>
              <p className="max-w-2xl text-lg lg:text-2xl font-bold spacing text-darkGray tracking-wide">
                Investimos em inovação e sustentabilidade para garantir
                construções seguras, duráveis e únicas.
              </p>
              <div>
                <Link
                  href={"/portfolio"}
                  className={cn(buttonVariants({ size: "lg" }), "my-4")}
                >
                  Ver obras
                </Link>
              </div>
            </div>
          </div>
          <div className="2xl:float-right flex justify-center lg:justify-end items-center border border-darkGray rounded-xl overflow-x-hidden lg:mx-48 2xl:mx-96 mx-4 lg:w-1/2 2xl:w-1/3 my-8">
            <div className="bg-black w-full flex items-center justify-center text-lightGray flex-col gap-2 py-4">
              <span className="font-bold text-4xl text-primary">672</span>
              Obras
            </div>
            <div className="bg-white flex w-full items-center justify-center text-darkGray flex-col gap-2 py-4">
              <span className="font-bold text-4xl text-black">7</span>
              Distinções
            </div>
            <div className="bg-white flex w-full items-center justify-center text-darkGray flex-col gap-2 py-4">
              <span className="font-bold text-4xl text-black">66</span>
              Colaboradores
            </div>
          </div>
        </div>
      </div>
      <div
        className="hidden 2xl:block ml-[40%] before:-ml-[70%] w-[60%] h-full relative before:absolute before:w-full before:h-full before:bg-white before:top-0 before:-left-[10%] before:transform before:skew-x-12"
        style={{
          backgroundImage: "url('/assets/images/background.webp')",
        }}
      ></div>
    </div>
  );
};

export default Header;
