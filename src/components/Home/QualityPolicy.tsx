import { cn } from "@/lib/utils";
import { Eye, Lightbulb, PieChart, Target } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/Button";

const QualityPolicy = () => {
  return (
    <div className="py-16">
      <h1 className="text-5xl font-bold text-center leading-[4.5rem]">
        Política de <span className=" bg-secondary">Qualidade</span>
      </h1>
      <div className="space-y-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8 container">
          <div className="w-full shadow border border-lightGray rounded-xl space-y-6 p-8">
            <Target className="w-12 h-12 text-primary" />
            <div className="space-y-4">
              <h1 className="font-bold text-4xl">Missão</h1>
              <p className="text-darkGray text-lg">
                A nossa missão é oferecer soluções inovadoras, combinando
                qualidade e eficiência para a realização de projetos e soluções
                de sucesso.
              </p>
            </div>
          </div>
          <div className="bg-black shadow-lg shadow-gray rounded-xl w-full flex flex-col gap-4 justify-between p-8">
            <div className="space-y-4">
              <h1 className="text-white font-bold text-3xl">
                Comprometidos com a excelência em cada construção.
              </h1>
              <h2 className="text-gray font-bold text-2xl">
                Está interessado em <br /> saber mais?
              </h2>
            </div>
            <div>
              <Link href="/empresa" className={cn(buttonVariants())}>
                Ler mais
              </Link>
            </div>
          </div>
          <div className="w-full shadow border border-lightGray rounded-xl space-y-6 p-8">
            <PieChart className="w-12 h-12 text-primary" />
            <div className="space-y-4">
              <h1 className="font-bold text-4xl">Valores e Objetivos</h1>
              <p className="text-darkGray text-lg">
                Os nossos objetivos são sempre alcançar a competência e melhoria
                em tudo o que fazemos, preservando os nossos valores éticos e
                profissionais.
              </p>
            </div>
          </div>
        </div>
        <div className="container grid lg:grid-cols-6 gap-8">
          <div className="w-full shadow border border-lightGray rounded-xl space-y-6 p-8 lg:col-span-2 lg:col-start-2">
            <Eye className="w-12 h-12 text-primary" />
            <div className="space-y-4">
              <h1 className="font-bold text-4xl">Visão</h1>
              <p className="text-darkGray text-lg">
                A nossa visão é ser reconhecidos como uma empresa que oferece
                soluções de alta qualidade e competência, visando o sucesso dos
                nossos clientes.
              </p>
            </div>
          </div>
          <div className="w-full shadow border border-lightGray rounded-xl space-y-6 p-8 lg:col-span-2">
            <Lightbulb className="w-12 h-12 text-primary" />
            <div className="space-y-4">
              <h1 className="font-bold text-4xl">Estratégia</h1>
              <p className="text-darkGray text-lg">
                Na Norasil, tudo fazemos para promover e valorizar a nossa
                imagem, para sermos reconhecidos como referência no mercado da
                construção civil.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityPolicy;
