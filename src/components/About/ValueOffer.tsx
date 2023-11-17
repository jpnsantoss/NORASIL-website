import { cn } from "@/lib/utils";
import { HeartHandshake, Search, ShieldCheck, Wrench } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/Button";

const ValueOffer = () => {
  return (
    <div className="py-16">
      <h1 className="text-5xl font-bold text-center leading-[4.5rem] px-4">
        Proposta de <span className=" bg-secondary">Valor</span>
      </h1>
      <div className="container grid lg:grid-cols-3 gap-8 pt-16">
        <div className="w-full flex items-center">
          <div className="w-full shadow border border-lightGray rounded-xl space-y-6 p-8">
            <HeartHandshake className="w-10 h-10 text-primary" />
            <div className="space-y-4">
              <h1 className="font-bold text-3xl">Proximidade</h1>
              <p className="text-darkGray text-lg">
                O estabelecimento de uma relação de proximidade com os Clientes
                e tudo fazer para merecer a confiança e a preferência dos nossos
                Clientes.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full grid gap-8">
          <div className="w-full shadow border border-lightGray rounded-xl space-y-6 p-8">
            <Search className="w-10 h-10 text-primary" />
            <div className="space-y-4">
              <h1 className="font-bold text-3xl">Rigor</h1>
              <p className="text-darkGray text-lg">
                Cumprimento de compromissos, num quadro de profissionalismo e
                responsabilidade.
              </p>
            </div>
          </div>
          <div className="bg-black shadow-lg shadow-gray rounded-xl w-full space-y-4 p-8">
            <h2 className="text-white font-bold text-xl">
              Queres ver estes <br /> em Ação?
            </h2>
            <Link href="/empresa" className={cn(buttonVariants())}>
              Ver obras
            </Link>
          </div>
          <div className="w-full shadow border border-lightGray rounded-xl space-y-6 p-8">
            <Wrench className="w-10 h-10 text-primary" />
            <div className="space-y-4">
              <h1 className="font-bold text-3xl">Competência</h1>
              <p className="text-darkGray text-lg">
                O desempenho das funções individuais respeitando os princípios
                da ética, rigor, eficiência e integridade.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center">
          <div className="w-full shadow border border-lightGray rounded-xl space-y-6 p-8">
            <ShieldCheck className="w-10 h-10 text-primary" />
            <div className="space-y-4">
              <h1 className="font-bold text-2xl">SQA</h1>
              <p className="text-darkGray text-lg text-clip">
                A prestação de um Serviço de Excelência, cumprindo as
                Especificações Legais e a diminuição continua da Neutralidade
                Carbónica e Impactos Ambientais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueOffer;
