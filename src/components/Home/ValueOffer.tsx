import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { Button } from "../ui/Button";

const Offers = [
  {
    title: "Vocação",
    description: "Prestação de Serviço de Excelência.",
    image: "/assets/images/valueoffer/pic1.jpg",
  },
  {
    title: "Competência",
    description: "Melhores Regras e Processos Construtivos.",
    image: "/assets/images/valueoffer/pic2.jpg",
  },
  {
    title: "Qualidade",
    description: "Em permanência e em todas as suas vertentes.",
    image: "/assets/images/valueoffer/pic3.jpg",
  },
];

const ValueOffer: FC = () => {
  return (
    <div className="container grid lg:grid-cols-4 gap-8 py-16">
      {Offers.map((offer, index) => (
        <div key={index} className="w-full h-[40vh] relative shadow-lg">
          <Image
            src={offer.image}
            alt="Teste"
            fill
            className="bg-cover bg-center"
          />
          <div className="absolute bottom-0 h-28 w-full bg-white  grid grid-cols-4">
            <div className="col-span-3 p-4">
              <h1 className="text-xl font-semibold">{offer.title}</h1>
              <p>{offer.description}</p>
            </div>
            <div className="bg-primary flex justify-center items-center">
              <PlusIcon className="text-white" />
            </div>
          </div>
        </div>
      ))}
      <div className="w-full bg-white border-[20px] border-lightGray h-[40vh] p-4">
        <div className="h-full w-full  flex flex-col justify-center items-center gap-8">
          <h1 className="text-4xl">
            Proposta de <span className="font-bold">Valor.</span>
          </h1>
          <p className="text-darkGray text-lg">
            Oferecemos soluções personalizadas e de alta qualidade para os
            nossos clientes, combinando o nosso conhecimento técnico e
            compromisso com o prazo e orçamento.
          </p>
          <div className="w-full flex justify-center items-center">
            <Button className="text-xl py-6 px-8">Ver mais</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueOffer;
