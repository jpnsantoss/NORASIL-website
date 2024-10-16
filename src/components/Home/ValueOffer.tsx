import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/Button";

const ValueOffer = () => {
  return (
    <div className="container grid lg:grid-cols-2 gap-8 py-16 lg:px-48">
      <div className="w-full flex items-center">
        <div className="w-full relative rounded-xl h-[40vh] lg:h-[60vh] overflow-hidden group">
          <Image
            src="/assets/images/valueoffer/pic2.webp"
            alt="Competência"
            fill
            className="object-center object-cover group-hover:scale-105 transition ease-in-out duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-[#000] pointer-events-none"></div>
          <div className="absolute bottom-0 w-full p-8 space-y-2">
            <div>
              <h1 className="text-white text-3xl font-bold">Competência</h1>
              <p className="text-lightGray text-xl">
                Melhores Regras e Processos Construtivos.
              </p>
            </div>
            <Link
              href="/empresa"
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-primary p-0 text-2xl",
              )}
            >
              Ver mais
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full grid order-first lg:order-last gap-8">
        <div className="w-full shadow border border-lightGray rounded-xl py-16 px-8">
          <div className="space-y-8">
            <h1 className=" text-4xl">
              Proposta de <span className="font-bold">Valor</span>
            </h1>
            <p className="text-darkGray text-xl">
              Oferecemos soluções personalizadas e de alta qualidade para os
              nossos clientes, combinando o nosso conhecimento técnico com o
              compromisso de prazo e orçamento.
            </p>
            <Link
              href={"/empresa"}
              className={cn(buttonVariants(), "shadow-btn")}
            >
              Ver Tudo
            </Link>
          </div>
        </div>
        <div className="w-full relative rounded-xl h-[40vh] overflow-hidden group">
          <Image
            src="/assets/images/valueoffer/pic1.webp"
            alt="Competência"
            fill
            className="object-center object-cover group-hover:scale-105 transition ease-in-out duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-30% to-[#000] pointer-events-none"></div>
          <div className="absolute bottom-0 w-full p-8 space-y-2">
            <div>
              <h1 className="text-white text-3xl font-bold">Vocação</h1>
              <p className="text-lightGray text-xl">
                Prestação de Serviço de Excelência.
              </p>
            </div>
            <Link
              href="/empresa"
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-primary p-0 text-2xl",
              )}
            >
              Ver mais
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueOffer;
