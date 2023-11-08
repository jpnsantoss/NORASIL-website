import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Link from "next/link";
import { FC } from "react";
import { Button, buttonVariants } from "../ui/Button";

interface AboutHeaderProps {}

const inter = Inter({ subsets: ["latin"] });

const AboutHeader: FC<AboutHeaderProps> = ({}) => {
  return (
    <div className="w-full px-4 lg:px-48 lg:py-16">
      <h2 className="text-2xl font-semibold mb-2">De obra em obra,</h2>
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h1
            className={cn(
              inter.className,
              "text-3xl lg:text-6xl font-semibold leading-[2.5rem] lg:leading-[5rem]"
            )}
          >
            Vamos construindo o futuro, seguramente.
          </h1>
          <div>
            <Link
              href={"/portfolio"}
              className={cn(buttonVariants({ size: "lg" }), "my-4")}
            >
              Ver obras
            </Link>
          </div>
        </div>
        <div className="space-y-4 texl-xl lg:text-2xl mt-4">
          <h2 className="font-bold">
            A Norasil com mais de 40 anos de atividade. Somos uma empresa de
            referência no mercado de construção em Portugal Continental.
          </h2>
          <p className="text-darkGray">
            É a nossa ambição e empreendedorismo que nos tem permitido um
            crescimento constante, consolidado e sustentado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;
