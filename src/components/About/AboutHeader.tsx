import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { FC } from "react";
import { Button } from "../ui/Button";

interface AboutHeaderProps {}

const inter = Inter({ subsets: ["latin"] });

const AboutHeader: FC<AboutHeaderProps> = ({}) => {
  return (
    <div className="w-full px-4 lg:px-48 lg:py-16">
      <h2 className="text-2xl font-semibold mb-2">De obra em obra,</h2>
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="flex flex-col justify-between">
          <h1
            className={cn(
              inter.className,
              "text-3xl lg:text-6xl font-semibold leading-[2.5rem] lg:leading-[5rem]"
            )}
          >
            Vamos construindo o futuro, seguramente.
          </h1>
          <Button
            size={"lg"}
            className="text-xl font-bold py-6 my-4 px-10 w-fit rounded-lg shadow-md shadow-secondary"
          >
            Ver Obras
          </Button>
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
