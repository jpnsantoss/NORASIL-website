import { Award, HardHat, Leaf } from "lucide-react";

const Sqa = () => {
  return (
    <div className="py-16">
      <h1 className="text-5xl font-bold text-center leading-[4.5rem]">
        <span className=" bg-secondary">Segurança, Qualidade e Ambiente</span>
      </h1>
      <div className="container pt-16 space-y-16 relative">
        <div>
          <div className="flex gap-2 items-center text-4xl font-bold">
            <h1>Segurança</h1>
            <HardHat className="w-12 h-12 text-primary" />
          </div>
          <p className="text-2xl text-darkGray ml-8 my-4">
            A Norasil honra os compromissos assumidos com os seus clientes e
            cumpre rigorosamente todas as obrigações legais.
          </p>
        </div>
        <div className="lg:ml-16">
          <div className="flex gap-2 items-center text-4xl font-bold">
            <h1>Qualidade</h1>
            <Award className="w-12 h-12 text-primary" />
          </div>
          <p className="text-2xl text-darkGray ml-8 my-4">
            Neste contexto, está naturalmente institucionalizado um conjunto de
            procedimentos, normalização, parametrização, e avaliações periódicas
            de desempenho, que são garantes de uma construção cuidada, com a
            qualidade e segurança.
          </p>
        </div>
        <div>
          <div className="flex gap-2 items-center text-4xl font-bold">
            <h1>Ambiente</h1>
            <Leaf className="w-12 h-12 text-primary" />
          </div>
          <p className="text-2xl text-darkGray ml-8 my-4">
            A Norasil também cumpre a legislação aplicável nas áreas de
            segurança, saúde, higiene e ambiente.
          </p>
        </div>

        <div className="h-[600px] w-[600px] hidder lg:block text-primary absolute -top-10 -left-[600px] border-[20px] border-primary rounded-full" />
      </div>
    </div>
  );
};

export default Sqa;
